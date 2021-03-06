import React from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Courses from "./courses";
import Profile from "./profile";
import Requirements from "./requirements";
import Home from "./home";

class Dashboard extends React.Component {
    render() {
        return <Switch>
            <Route path={`${this.props.match.path}/profile`}><Profile/></Route>
            <Route path={`${this.props.match.path}/requirements`}><Requirements /></Route>
            <Route path={`${this.props.match.path}/courses`}><Courses /></Route>
            <Route exact path={`${this.props.match.path}`}><Home /></Route>
            <Redirect from={this.props.match.path} to={this.props.match.path} />
        </Switch>
    }
}
export default withRouter(connect(null, null)(Dashboard));