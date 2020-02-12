import React, { Component } from "react";
import { authenticationService } from "./_services/authentication.service.js";

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = { 
			username: "",
            password: "",
            error: "",
            isLoading: false
        };
        
        if (authenticationService.isAuthenticated) {
            this.props.history.push("/");
        }
	}
    
    handleLogin = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        
        authenticationService.login(this.state.username, this.state.password)
        .then(response => {
            this.setState({ isLoading: false });
            if (response.ok) {
                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);
            } else if ([401, 403].indexOf(response.status) !== -1) {
                authenticationService.logout();
                this.setState({ error: "Bad credentials" })
            }
        }).catch(error => this.setState({ error: error.message, isLoading: false }));
    }

    handleUsernameChange = (e) => {
		this.setState({username: e.target.value});
	}

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	}
    
    render() {
        const { isLoading, error } = this.state;
        
        if (isLoading) {
            return <p>Loading ...</p>;
        }

		return (
            <div className="text-center">
                <div className="mb-3">{error}</div>
                <form className="form-signin" method="post">
                    <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
                    <label htmlFor="username" className="sr-only">User</label>
                    <input type="text" name="username" id="username" className="form-control" placeholder="User" required autoFocus onChange={this.handleUsernameChange} />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Password" required onChange={this.handlePasswordChange} />
                    <div className="mb-3"></div>

                    <input type="submit" className="btn btn-lg btn-primary btn-block" value="Log In" onClick={this.handleLogin} />
                </form>
            </div>
		);
	}
}
 
export default Login;