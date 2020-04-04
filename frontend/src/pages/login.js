import React from "react";
import {connect} from "react-redux";
import {Form, Card, Container, Row} from "react-bootstrap";
import {sendCredentials} from "../actions/user";
import ThemedButton from "../components/button";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onLogin = (e) => {
        e.preventDefault();

        const { username, password } = this.state;
        if (username && password) {
            this.setState({ submitted: true });
            this.props.sendCredentials(username, password);
        }
    };

    render() {
        const text_color = this.props.theme.dark ? "text-muted-dark" : "text-muted";
        const bg = this.props.theme.dark ? "bg-secondary" : "bg-gray";
        return <Container>
            <Card className={[ "my-5", "p-5", bg ]}><Card.Body>
            <h1 className="mb-5">Login with your AccessNet credentials.</h1>
            <Form onSubmit={this.onLogin}>
                <Form.Group as={Row}>
                    <Form.Label>AccessNet Username</Form.Label>
                    <Form.Control type="string" placeholder="AccessNet username" name="username" onChange={this.onChange} />
                    <Form.Text className={text_color}>
                        This is the username you use to log into the portal.
                    </Form.Text>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Temple password" name="password" onChange={this.onChange} />
                    <Form.Text className={text_color}>
                        We encrypt your password before storing it in the database.
                    </Form.Text>
                </Form.Group>
                <ThemedButton block type="submit">Login</ThemedButton>
            </Form>
            </Card.Body></Card>
        </Container>
    }
}

export default connect(({ theme }) => ({ theme }), { sendCredentials })(Login);