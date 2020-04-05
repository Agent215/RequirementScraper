import React from "react";
import {connect} from "react-redux";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import Courses from "./courses"

class Dashboard extends React.Component {
    render() {
        return <Switch>
            <Route path={`${this.props.match.path}/profile`} />
            <Route path={`${this.props.match.path}/requirements`} />
            <Route path={`${this.props.match.path}/courses`}><Courses /></Route>
            <Route exact path={`${this.props.match.path}`} />
            <Redirect from={this.props.match.path} to={this.props.match.path} />
        </Switch>
    }
}
export default withRouter(connect(null, null)(Dashboard));