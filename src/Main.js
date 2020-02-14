import React, { Component } from "react";

import {
	Route,
	NavLink,
	HashRouter
} from "react-router-dom";

import Home from "./Home";
import ArticleList from "./ArticleList";
import ArticleEditor from "./ArticleEditor";
import { loadScript } from "./_helpers/load.script.js";

class Main extends Component {
    componentWillMount() {
        loadScript(process.env.REACT_APP_DISTR_PATH_BASE + "/dist/common.js", "common", null);
    }
    
    render() {
		return (
			<HashRouter>
				<div className="d-flex" id="wrapper">
					<div className="bg-light border-right" id="sidebar-wrapper">
						<div className="sidebar-heading">Administration </div>
						<div className="list-group list-group-flush">
							<NavLink to="/" className="list-group-item list-group-item-action bg-light" activeClassName="">Home</NavLink>
							<NavLink to="/article/list" className="list-group-item list-group-item-action bg-light" activeClassName="">Articles</NavLink>
						</div>
					</div>
					
					<div id="page-content-wrapper">
						<nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
							<button className="btn btn-primary" id="menu-toggle">Toggle Menu</button>
					
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
					
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
									<li className="nav-item active">
										<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#">Logout</a>
									</li>
								</ul>
							</div>
						</nav>
					
						<div className="container-fluid content">
							<Route exact path="/" component={Home}/>
							<Route exact path="/article/list" component={ArticleList}/>
							<Route exact path="/article/editor/:id?" component={ArticleEditor}/>
						</div>
					</div>
				</div>
			</HashRouter>
		);
	}
}
 
export default Main;