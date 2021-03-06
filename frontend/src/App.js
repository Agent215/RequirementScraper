import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import './App.scss';
import {LoggedInState} from "./reducers/loggedIn";
import Navigation from "./components/navigation";
import Home from "./pages/home";
import Footer from "./components/footer";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard/dashboard";
import Messages from "./components/messages";

class App extends React.Component {
    render() {
        const loggedIn = this.props.logged_in === LoggedInState.LOGGED_IN;
        if (this.props.theme.dark) {
            document.body.classList.add("bg-dark");
            document.body.classList.add("text-light");
        } else {
            document.body.classList.remove("bg-dark");
            document.body.classList.remove("text-light");
        }

        return <Router>
            <Navigation />
            <Switch>
                <Route path="/login">{ loggedIn ? <Redirect to="/dashboard" /> : <Login />}</Route>
                <Route path="/dashboard">{ loggedIn ? <Dashboard /> : <Redirect to="/login" />}</Route>
                <Route exact path="/"><Home /></Route>
                <Redirect from="/" to="/" /> {/* Redirects all non-matching routes to the home page */}
            </Switch>
            <Footer />
            <Messages />
        </Router>
    }
}

export default connect(({ logged_in, theme }) => ({ logged_in, theme }))(App);