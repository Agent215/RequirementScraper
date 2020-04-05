import React from "react";
import {connect} from "react-redux";
import {fetchCompleted} from "../../actions/courses";
import {Alert, Card, Container, Spinner} from "react-bootstrap";
import ThemedCard from "../../components/card";

class CourseItem extends React.Component {
    render() {
        return <li>
            { this.props.course }
        </li>
    }
}

class Courses extends React.Component {
    componentDidMount() {
        this.props.fetchCompleted(this.props.user.user_id);
    }

    render() {
        return <Container>
            <ThemedCard className={[ "my-5", "p-5" ]}><Card.Body>
                <h1 className="mb-5">Completed Courses</h1>
                { this.props.courses.error !== null ? this.error() :
                    this.props.courses.loading ? this.loading() : this.loaded() }
            </Card.Body></ThemedCard>
        </Container>
    }

    loading() {
        return <div className="text-center">
            <Spinner animation="border" />
            <h2>Fetching your courses...</h2>
        </div>
    }

    loaded() {
        return <ul>
            { this.props.courses.completed.forEach(course => <CourseItem key={course} course={course} />) }
        </ul>
    }

    error() {
        return <Alert variant="danger">
            <Alert.Heading>Oh no!</Alert.Heading>
            <p>
                Failed to fetch your completed course list!
            </p>
        </Alert>
    }
}

export default connect(({ user, courses }) => ({ user, courses }), { fetchCompleted })(Courses);