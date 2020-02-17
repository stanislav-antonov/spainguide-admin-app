import React, { Component } from "react";
import { authenticationService } from "./_services/authentication.service.js";
import { articleService } from "./_services/article.service.js";

class ArticleList extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			articles: [],
			
			error: "",
			isLoading: false,
		};
	}

	componentDidMount() {
		articleService.list().then(response => { 
			this.setState({ isLoading: false });
			if (response.ok) {
                return response.json();
			} else {
				if ([401, 403].indexOf(response.status) !== -1) {
					authenticationService.logout();
					this.props.history.push("/login");
                }
                
                return;
            }
        }).then(data => {
                console.log(data);
                this.setState({ articles: data });
        }).catch(error => { 
            this.setState({ error: error, isLoading: false });
        });
	}

	render() {
		return (
			<div>
				<h1 className="mt-4">Articles</h1>
                {this.state.articles.map(function(article, idx) {
                    return (
                        <div key={idx}>
                            <h4>{article.headline}</h4>
                        </div>
                    )
                })}
			</div>
		);
	}
}
 
export default ArticleList;
