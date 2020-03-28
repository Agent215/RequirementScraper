import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {connect} from "react-redux";
import {loggedOut} from "./actions/loggedIn";
import {Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoggedInState} from "./reducers/loggedIn";

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
                        <Nav.Link onClick={() =>  this.props.loggedOut()}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/dashboard"></Route>
            </Switch>
        </>);
    }
}

export default connect(({ logged_in }) => ({ logged_in }), {loggedOut})(App);
