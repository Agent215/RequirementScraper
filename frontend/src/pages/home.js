import React from "react";
import {connect} from "react-redux";
import {Card, Col, Container, Jumbotron, Row} from "react-bootstrap";
import ThemedButton from "../components/button";
import {sendCredentials} from "../actions/user";

class Home extends React.Component {
    render() {
        const bg = this.props.theme.dark ? "bg-secondary" : "bg-gray";
        return <>
            <Jumbotron fluid className={["text-center", bg]}>
                <Container>
                    <h1>Graduation Requirement Auditor Visualizer</h1>
                    <p>
                        The Graduation Requirement Auditor Visualizer, also known as GRAV, is a super-simple system that makes
                        visualizing you graduation requirements easier to understand. With a very simple and intuitive interface
                        you'll find that it is much easier to understand than the existing systems.
                    </p>
                    <ThemedButton onClick={() => this.props.sendCredentials("newguy", "test_password") }>Test Login</ThemedButton>
                </Container>
            </Jumbotron>
            <Container fluid>
                <Row xs={1} md={3}>
                    <Col className="mb-3 mb-md-0">
                        <Card className={bg}>
                            <Card.Img variant="top" src="https://picsum.photos/1920/1080" />
                            <Card.Body>
                                <Card.Title>Requirements at a Glance</Card.Title>
                                <Card.Text>
                                    Quickly view all of your major's requirements and courses that can
                                    fulfill them.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3 mb-md-0">
                        <Card className={bg}>
                            <Card.Img variant="top" src="https://picsum.photos/1920/1080" />
                            <Card.Body>
                                <Card.Title>Completed Courses</Card.Title>
                                <Card.Text>
                                    Take a look at every course you have completed so far in your journey of acquiring
                                    your degree.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3 mb-md-0">
                        <Card className={bg}>
                            <Card.Img variant="top" src="https://picsum.photos/1920/1080" />
                            <Card.Body>
                                <Card.Title>Pie Graphs</Card.Title>
                                <Card.Text>
                                    Pie graphs help visualize your progress toward graduation by showing
                                    you how many requirements have been fulfilled out of those required by
                                    your major.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    }
}

export default connect(({ theme }) => ({ theme }), { sendCredentials })(Home);