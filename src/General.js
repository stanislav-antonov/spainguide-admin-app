import React, { Component } from "react";
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect
} from "react-router-dom";

import Login from "./Login";
import Main from "./Main";
import { authenticationService } from "./_services/authentication.service.js";
import "./index.css";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = {(props) => (
        authenticationService.isAuthenticated ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)

class General extends Component {
    render() {
        return (
            <div> 
                <Router>
                    <Switch>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/" component={Main} />
                    </Switch>
                </Router>
            </div>
        )
	}
}

export default General;