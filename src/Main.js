import React, { Component } from "react";

import {
	Route,
	NavLink,
	HashRouter
} from "react-router-dom";

import Home from "./Home";
import Articles from "./Articles";
import Article from "./Article";
import { loadScript } from "./_helpers/common.js";

class Main extends Component {
    componentWillMount() {
        loadScript(process.env.REACT_APP_DISTR_PATH_BASE + "/dist/common.js", "common", null);
    }
    
    render() {
		return (
			<HashRouter>
				<div class="d-flex" id="wrapper">
					<div class="bg-light border-right" id="sidebar-wrapper">
						<div class="sidebar-heading">Administration </div>
						<div class="list-group list-group-flush">
							<NavLink to="/" className="list-group-item list-group-item-action bg-light" activeClassName="">Home</NavLink>
							<NavLink to="/articles" className="list-group-item list-group-item-action bg-light" activeClassName="">Articles</NavLink>
						</div>
					</div>
					
					<div id="page-content-wrapper">
						<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
							<button class="btn btn-primary" id="menu-toggle">Toggle Menu</button>
					
							<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon"></span>
							</button>
					
							<div class="collapse navbar-collapse" id="navbarSupportedContent">
								<ul class="navbar-nav ml-auto mt-2 mt-lg-0">
									<li class="nav-item active">
										<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
									</li>
									<li class="nav-item">
										<a class="nav-link" href="#">Logout</a>
									</li>
								</ul>
							</div>
						</nav>
					
						<div class="container-fluid content">
							<Route exact path="/" component={Home}/>
							<Route exact path="/articles" component={Articles}/>
							<Route exact path="/article/:id?" component={Article}/>
						</div>
					</div>
				</div>
			</HashRouter>
		);
	}
}
 
export default Main;