import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoggedInState} from "./reducers/loggedIn";
import Navigation from "./components/navigation";

class App extends React.Component {
    render() {
        const loggedIn = this.props.logged_in === LoggedInState.LOGGED_IN;

        return <Router>
            <Navigation />
            <Switch>
                <Route path="/login">{ loggedIn ? <Redirect to="/dashboard" /> : <div>{/* add login page component */}</div>}</Route>
                <Route path="/dashboard">{ loggedIn ? <div>{/* add dashboard page component */}</div> : <Redirect to="/login" />}</Route>
                <Route exact path="/">{/* add home page component */}</Route>
                <Redirect from="/" to="/" /> {/* Redirects all non-matching routes to the home page */}
            </Switch>
        </Router>
    }
}

export default connect(({ logged_in }) => ({ logged_in }))(App);
