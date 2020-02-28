import React, { Component } from "react";
import { authenticationService } from "./_services/authentication.service.js";
import { articleService } from "./_services/article.service.js";
import { config } from "./config.js";
import { HashRouter, NavLink } from "react-router-dom";

class ArticleList extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			articles: [],
			
			error: "",
			isLoading: false,
		};
	}

    handleCreateNew = (e) => {
        e.preventDefault();
        this.props.history.push("/article/editor");
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
        let articles;
        if (this.state.articles) {
            articles = this.state.articles.map(function(article, idx) {
                const imageWrapperStyle = {
                    msFlex: "0 0 300px",
                    flex: "0 0 300px",
                };
                
                const imageStyle = {
                    backgroundImage: "url(" + config.fileStorageBaseURL + "/" + article.image + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundOrigin: "padding-box",
                    width: "100%",
                    height: "250px",
                };

                return (
                    <div key={idx} className="row mb-4">
                        <div className="col-sm-6" style={imageWrapperStyle}>
                            <div style={imageStyle}></div>
                        </div>
                        <div className="col-sm-6">
                            <h4><NavLink to={"/article/editor/" + article.id}>{article.headline}</NavLink></h4>
                            <p>{article.preview}</p>
                        </div>
                    </div>
                )
            });
        }
        
        return (
			<div>
                <div className="row">
				    <div className="col">
                        <h1 className="mt-3 float-left">Articles</h1>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary float-right mt-4" onClick={this.handleCreateNew}>Create New</button>
                    </div>
                </div>
                <div className="mt-3">{articles}</div>
			</div>
		);
	}
}
 
export default ArticleList;
