import React from "react";
import {connect} from "react-redux";
import {Form, Card, Container, Row, Spinner} from "react-bootstrap";
import {sendCredentials} from "../actions/user";
import ThemedButton from "../components/button";
import {LoggedInState} from "../reducers/loggedIn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Themes} from "../reducers/theme";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username_valid: false,
            username_msg: "You need to fill out this field!",
            username: '',
            password_valid: false,
            password_msg: "You need to fill out this field!",
            password: '',
            submitted: false,
            validated: false
        }
    }

    validateUsername(username) {
        return /tu[a-z]\d{5}/i.test(username);
    }

    onUsernameChange = (e) => {
        const username = e.target.value;
        const valid = this.validateUsername(username);
        this.setState({ username, username_msg: valid ? "Looks good!" : "Invalid username, it should be like: tux00000", username_valid: valid });
    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        const valid = !(!password || 0 === password.length);
        this.setState({ password: e.target.value, password_msg: valid ? "Looks good!" : "You need to fill out this field!", password_valid: valid });
    };

    onLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const { username, password } = this.state;

        if (form.checkValidity()) {
            this.setState({ submitted: true });
            this.props.sendCredentials(username, password);
        }

        this.setState({ validated: true });
    };

    render() {
        const loggingIn = this.props.logged_in === LoggedInState.LOGGING_IN;
        const text_color = this.props.theme.dark ? "text-muted-dark" : "text-muted";
        const bg = this.props.theme.dark ? "bg-secondary" : "bg-gray";
        const outline = this.props.theme.dark ? "text-outline-dark" : "text-outline-light";
        const highContrast = this.props.theme.primary === Themes.Contrast;
        const formTextClasses = [text_color, highContrast ? "font-weight-bold" : "", highContrast ? outline : ""];
        const feedbackClasses = [highContrast ? "font-weight-bold" : "", highContrast ? outline : ""];
        return <Container>
            <Card className={[ "my-5", "p-5", bg ]}><Card.Body>
            <h1 className="mb-5">Login with your AccessNet credentials.</h1>
            <Form noValidate validated={this.state.validated} onSubmit={this.onLogin}>
                <Form.Group as={Row}>
                    <Form.Label>AccessNet Username</Form.Label>
                    <Form.Control type="string" placeholder="tux00000" name="username" pattern="[Tt][Uu][a-zA-Z]\d{5}" onChange={this.onUsernameChange} required />
                    <Form.Text className={formTextClasses}>
                        This is the username you use to log into the portal.
                    </Form.Text>
                    {
                        this.state.username_msg == null ? "" :
                            <Form.Control.Feedback type={this.state.username_valid ? "valid" : "invalid"} className={feedbackClasses}>
                                <FontAwesomeIcon icon={this.state.username_valid ? faCheck : faTimes} className="mr-1" />
                                {this.state.username_msg}
                            </Form.Control.Feedback>
                    }
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Temple password" name="password" onChange={this.onPasswordChange} required />
                    <Form.Text className={formTextClasses}>
                        We encrypt your password before storing it in the database.
                    </Form.Text>

                    {
                        this.state.password_msg == null ? "" :
                            <Form.Control.Feedback type={this.state.password_valid ? "valid" : "invalid"} className={feedbackClasses}>
                                <FontAwesomeIcon icon={this.state.password_valid ? faCheck : faTimes} className="mr-1" />
                                {this.state.password_msg}
                            </Form.Control.Feedback>
                    }
                </Form.Group>
                <ThemedButton block type="submit" disabled={loggingIn}>
                    { loggingIn ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Logging In...</> : "Login" }
                </ThemedButton>
            </Form>
            </Card.Body></Card>
        </Container>
    }
}

export default connect(({ theme, logged_in }) => ({ theme, logged_in }), { sendCredentials })(Login);