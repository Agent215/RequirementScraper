import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoggedInState} from "./reducers/loggedIn";
import {doLogOut} from "./actions/loggedIn";

class App extends Component {
    render() {
        return <Router>{ this.props.logged_in === LoggedInState.LOGGED_IN ? this.renderLoggedIn() : this.renderLoggedOut() }</Router>
    }

    renderLoggedOut() {
        return (<>
            <Navbar bg="light">
                <Navbar.Brand href="/">GRAV</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar>
            <Switch>
                <Route path="/login"></Route>
                <Route exact path="/"></Route>
                <Route path="/"><Redirect to="/" /></Route>
            </Switch>
        </>);
    }

    renderLoggedIn() {
        return (<>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">GRAV</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/dashboard">Home</Nav.Link>
                        <Nav.Link href="/dashboard/courses">Courses</Nav.Link>
                        <Nav.Link href="/dashboard/requirements">Requirements</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={() =>  this.props.doLogOut()}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/login"><Redirect to="/dashboard" /></Route>
                <Route path="/dashboard"></Route>
                <Route exact path="/"></Route>
                <Route path="/"><Redirect to="/" /></Route>
            </Switch>
        </>);
    }
}

export default connect(({ logged_in }) => ({ logged_in }), {doLogOut})(App);
