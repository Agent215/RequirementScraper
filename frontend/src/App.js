import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import './App.scss';
import {LoggedInState} from "./reducers/loggedIn";
import Navigation from "./components/navigation";
import Home from "./pages/home";
import Footer from "./components/footer";

class App extends React.Component {
    render() {
        const loggedIn = this.props.logged_in === LoggedInState.LOGGED_IN;

        return <Router>
            <Navigation />
            <Switch>
                <Route path="/login">{ loggedIn ? <Redirect to="/dashboard" /> : <div>{/* add login page component */}</div>}</Route>
                <Route path="/dashboard">{ loggedIn ? <div>{/* add dashboard page component */}</div> : <Redirect to="/login" />}</Route>
                <Route exact path="/"><Home /></Route>
                <Redirect from="/" to="/" /> {/* Redirects all non-matching routes to the home page */}
            </Switch>
            <Footer />
        </Router>
    }
}

export default connect(({ logged_in }) => ({ logged_in }))(App);
