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
                this.setState({ articles: response.json });
            } else {
                if ([401, 403].indexOf(response.status) !== -1) {
                    authenticationService.logout();
                    this.props.history.push("/login");
                }
            }
        }).catch(error => this.setState({ error: error.message, isLoading: false }));
    }
    
    render() {
		return (
			<div>
				<h1 class="mt-4">Articles</h1>
			</div>
		);
	}
}
 
export default ArticleList;
