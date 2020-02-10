import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = { 
			username: "",
            password: "",
            error: undefined,
            isLoading: false
		};
	}
    
    componentDidMount() {
        require("./login.css");
    }

    handleSignin = (e) => {
        e.preventDefault();

        let endpointUrl = process.env.REACT_APP_SERVER_URL + "/login";
        this.setState({ isLoading: true });

		fetch(endpointUrl, {
			method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        }).then(response => {
            console.log(response.headers.get('Authorization'));
            return response.text() 
        }).then(data => {
            this.setState({ isLoading: false })
        }).catch(error => this.setState({ error: error, isLoading: false }));
    }

    handleUsernameChange = (e) => {
		this.setState({username: e.target.value});
	}

	handlePasswordChange = (e) => {
		this.setState({password: e.target.value});
	}
    
    render() {
        const { isLoading, error } = this.state;
        if (error) {
            return <p>{error.message}</p>;
        }
        
        if (isLoading) {
            return <p>Loading ...</p>;
        }

		return (
            <div className="text-center">
                <form className="form-signin" method="post">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="username" className="sr-only">User</label>
                    <input type="text" name="username" id="username" className="form-control" placeholder="User" required autoFocus onChange={this.handleUsernameChange} />
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" name="password" id="password" className="form-control" placeholder="Password" required onChange={this.handlePasswordChange} />
                    <div className="mb-3"></div>

                    <input type="submit" className="btn btn-lg btn-primary btn-block" value="Sign In" onClick={this.handleSignin} />
                </form>
            </div>
		);
	}
}
 
export default Login;