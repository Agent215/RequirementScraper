import React from "react";
import {connect} from "react-redux";
import {Card, Container} from "react-bootstrap";
import {sendCredentials} from "../actions/user";
import {LoggedInState} from "../reducers/loggedIn";
import LoginForm from "../components/loginForm";
import ThemedCard from "../components/card";

class Login extends React.Component {
    render() {
        const loggingIn = this.props.logged_in === LoggedInState.LOGGING_IN;
        return <Container>
            <ThemedCard className={[ "my-5", "p-5" ]}><Card.Body>
            <h1 className="mb-5">Login with your AccessNet credentials.</h1>
            <LoginForm onSubmit={this.props.sendCredentials} loading={loggingIn}/>
            </Card.Body></ThemedCard>
        </Container>
    }
}

export default connect(({ theme, logged_in }) => ({ theme, logged_in }), { sendCredentials })(Login);