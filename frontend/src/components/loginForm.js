import React from "react";
import {connect} from "react-redux";
import {Form, Row, Spinner} from "react-bootstrap";
import ThemedButton from "../components/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Themes} from "../reducers/theme";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        let username, password;
        if (props.user !== null) {
            username = props.user.username;
            password = props.user.password;
        } else {
            username = '';
            password = '';
        }

        this.state = {
            username_valid: false,
            username_msg: "You need to fill out this field!",
            username,
            password_valid: false,
            password_msg: "You need to fill out this field!",
            password,
            submitted: false,
            validated: false
        }
    }

    validateUsername(username) {
        return /tu[a-z]\d{5}/i.test(username);
    }

    onUsernameChange = (e) => {
        e.preventDefault();
        const username = e.target.value;
        const valid = this.validateUsername(username);
        this.setState({ username, username_msg: valid ? "Looks good!" : "Invalid username, it should be like: tux00000", username_valid: valid });
    };

    onPasswordChange = (e) => {
        e.preventDefault();
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
            this.props.onSubmit(username, password);
        }

        this.setState({ validated: true });
    };

    render() {
        const disableUsername = this.props.disableUsername || false;
        const text_color = this.props.theme.dark ? "text-muted-dark" : "text-muted";
        const outline = this.props.theme.dark ? "text-outline-dark" : "text-outline-light";
        const highContrast = this.props.theme.primary === Themes.Contrast;
        const formTextClasses = [text_color, highContrast ? "font-weight-bold" : "", highContrast ? outline : ""];
        const feedbackClasses = [highContrast ? "font-weight-bold" : "", highContrast ? outline : ""];
        return <Form noValidate validated={this.state.validated} onSubmit={this.onLogin}>
            <Form.Group as={Row}>
                <Form.Label>AccessNet Username</Form.Label>
                <Form.Control type="string" placeholder="tux00000" name="username" pattern="[Tt][Uu][a-zA-Z]\d{5}" onChange={this.onUsernameChange} required value={this.state.username} disabled={disableUsername} />
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
                <Form.Control type="password" placeholder="Temple password" name="password" onChange={this.onPasswordChange} required value={this.state.password} />
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
            <ThemedButton block type="submit" disabled={this.props.loading}>
                { this.props.loading ? <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading...</> : "Submit" }
            </ThemedButton>
        </Form>
    }
}

export default connect(({ theme, logged_in, user }) => ({ theme, logged_in, user }), null)(LoginForm);