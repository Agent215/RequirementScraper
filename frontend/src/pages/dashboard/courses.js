import React from "react";
import {connect} from "react-redux";
import {fetchCompleted} from "../../actions/courses";
import {Alert, Card, Container, Spinner, Table} from "react-bootstrap";
import ThemedCard from "../../components/card";

class CourseItem extends React.Component {
    render() {
        return <tr>
            <td>{ this.props.course.CRN }</td>
            <td>{ this.props.course.Credit }</td>
            <td>{ this.props.course.Grade }</td>
            <td>{ this.props.course.Name }</td>
            <td>{ this.props.course.Term }</td>
        </tr>
    }
}

class Courses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }


    componentDidMount() {
        if (!this.props.courses.loaded) {
            this.props.fetchCompleted(this.props.user.user_id);
            this.setState({ loading: true });
        }
    }

    render() {
        if (this.state.loading && this.props.courses.loaded) this.setState({ loading: false });

        return <Container>
            <ThemedCard className={[ "my-5", "p-5" ]}><Card.Body>
                <h1 className="mb-5">Completed Courses</h1>
                { this.props.courses.error !== null ? this.error() : (this.state.loading ? this.loading() : this.loaded()) }
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
        return <Table striped bordered hover variant={this.props.theme.dark ? "dark" : "secondary"}>
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Credits</th>
                    <th>Grade</th>
                    <th>Name</th>
                    <th>Term</th>
                </tr>
            </thead>
            <tbody>
                { Object.entries(this.props.courses.completed).map(([key, course]) => <CourseItem key={key} course={course} />) }
            </tbody>
        </Table>
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

export default connect(({ user, courses, theme }) => ({ user, courses, theme }), { fetchCompleted })(Courses);