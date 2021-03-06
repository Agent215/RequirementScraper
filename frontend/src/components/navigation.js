import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import connect from "react-redux/es/connect/connect";
import {doLogOut} from "../actions/loggedIn";
import {Link, NavLink} from "react-router-dom";
import {LoggedInState} from "../reducers/loggedIn";

class NavbarRouteLink extends React.Component {
    render() {
        return <li className="nav-item"><NavLink {...this.props} className="nav-link" activeClassName="active">{ this.props.children }</NavLink></li>
    }
}


class Navigation extends React.Component {
    render() {
        return <Navbar bg={this.props.theme.primary} expand="lg" variant="dark">
            <Link to="/" className="navbar-brand">GRAV</Link>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                { this.props.logged_in === LoggedInState.LOGGED_IN ? this.renderLoggedIn() : this.renderLoggedOut() }
            </Navbar.Collapse>
        </Navbar>
    }

    renderLoggedIn() {
        return <>
            <ul className="navbar-nav mr-auto">
                <NavbarRouteLink exact to="/dashboard">Home</NavbarRouteLink>
                <NavbarRouteLink to="/dashboard/courses">Courses</NavbarRouteLink>
                <NavbarRouteLink to="/dashboard/requirements">Requirements</NavbarRouteLink>
            </ul>
            <Nav>
                <Nav.Item><hr className="border-top" /></Nav.Item>
                <Nav.Item className="navbar-text">Logged in as: {this.props.user.username}</Nav.Item>
                <NavbarRouteLink to="/dashboard/profile">Edit Profile</NavbarRouteLink>
                <Nav.Link onClick={() =>  this.props.doLogOut()}>Logout</Nav.Link>
            </Nav>
        </>
    }

    renderLoggedOut() {
        return <Nav className="ml-auto"><NavbarRouteLink to="/login">Login</NavbarRouteLink></Nav>
    }
}

export default connect(({ logged_in, user, theme }) => ({ logged_in, user, theme }), {doLogOut})(Navigation);