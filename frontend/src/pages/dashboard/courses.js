import React from "react";
import {connect} from "react-redux";
import {fetchCompleted} from "../../actions/courses";
import {Alert, Container, Jumbotron, Spinner, Table} from "react-bootstrap";

class CourseItem extends React.Component {
    formatGrade(grade) {
        switch (grade) {
            case "RG":
                return "Registered";
            case "CR":
                return "Credit (Credit/No-Credit)";
            case "CD":
                return "Credit D+, D, or D- (Credit/No-Credit)";
            case "NC":
                return "No Credit (Credit/No-Credit)";
            case "AU":
                return "Audit";
            case "I":
                return "Incomplete";
            case "IC":
                return "Incomplete (Credit/No-Credit)";
            case "IP":
                return "Incomplete (Pass/Fail)";
            case "M":
                return "Military Leave of Absence";
            case "MG":
                return "Grade Missing";
            case "NR":
                return "Grade Not Reported";
            case "P":
                return "Passed";
            case "PI":
                return "Permanent Incomplete";
            case "W":
                return "Withdrawn";
            case "WE":
                return "Excused Withdrawal";
            case "WS":
                return "Withdrawn from Semester (Historical)"
            default:
                return grade;
        }
    }

    render() {
        return <tr>
            <td>{ this.props.course.CRN }</td>
            <td>{ this.props.course.Credit }</td>
            <td>{ this.formatGrade(this.props.course.Grade) }</td>
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

        return <div>
            { this.props.courses.error !== null ? this.error() : (this.state.loading ? this.loading() : this.loaded()) }
        </div>
    }

    loading() {
        return <div className="text-center">
            <Spinner animation="border" />
            <h2>Fetching your courses...</h2>
        </div>
    }

    loaded() {
        const bg = this.props.theme.dark ? "bg-secondary" : "bg-gray";
        return <>
            <Jumbotron className={bg}>
                <h1>Courses</h1>
                <p>
                    The following are all of the courses you have registered for, the amount of credits it counts for,
                    the grade you received, and the term you completed the course.
                </p>
            </Jumbotron>
            <Container fluid>
                <Table striped bordered hover variant="secondary">
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
            </Container>
        </>
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