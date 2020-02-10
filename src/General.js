import React, { Component } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import Login from "./Login";
import Main from "./Main";

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

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        false ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)
  
export default General;