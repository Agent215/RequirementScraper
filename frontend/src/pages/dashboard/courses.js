import React from "react";
import {connect} from "react-redux";
import {fetchCompleted} from "../../actions/courses";
import {Alert, Container, Jumbotron, Spinner} from "react-bootstrap";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {numberFilter, textFilter} from "react-bootstrap-table2-filter";
import LoadingState from "../../reducers/loadingState";

const termMap = {
  SP: .1, S1: .2, S2: .3, FL: .4
};

const gradeMap = {
    WS: 0, WE: 1, W: 2, PI: 3, M: 4, F: 5, NC: 6, "D-": 7, D: 8, "D+": 9, CD: 10, "C-": 11, C: 12, "C+": 13, "B-": 14,
    B: 15, "B+": 16, "A-": 17, A: 18, S: 19, P: 20, CR: 21, TR: 22, NR: 23, MG: 24, IP: 25, IC: 26, I: 27, AU: 28, RG: 29
};

const gradeNameMap = {
    WS: "Withdrawn Semester (Historical)", WE: "Excused Withdrawal", W: "Withdrawn", PI: "Permanently Incomplete",
    M: "Military Leave of Absence", NC: "No Credit (Credit/No-Credit)", CD: "Credit D+, D, or D- (Credit/No-Credit)",
    CR: "Credit (Credit/No-Credit)", P: "Passed (Pass/Fail)", S: "Satisfactory",  NR: "Grade Not Reported", MG: "Missing Grade",
    IP: "Incomplete (Pass/Fail)", IC: "Incomplete (Credit/No-Credit)", I: "Incomplete", AU: "Audit", RG: "Registered",
    TR: "Transferred Credit"
};

const columns = [
    {
        dataField: 'CRN',
        text: 'Course',
        sort: true,
        filter: textFilter()
    },
    {
        dataField: 'Credit',
        text: 'Credits',
        sort: true,
        filter: numberFilter()
    },
    {
        dataField: 'Grade',
        text: 'Grade',
        sort: true,
        sortValue: cell => gradeMap[cell],
        sortFunc: (a, b, order) => order === "asc" ? a - b : b - a,
        formatter: cell => gradeNameMap.hasOwnProperty(cell) ? gradeNameMap[cell] : cell,
        filter: textFilter(),
        filterValue: cell => gradeNameMap.hasOwnProperty(cell) ? gradeNameMap[cell] : cell
    },
    {
        dataField: 'Name',
        text: 'Name',
        sort: true,
        filter: textFilter()
    },
    {
        dataField: 'Term',
        text: 'Term',
        sort: true,
        sortValue: cell => termMap[cell.substr(0, 2)] + parseInt(cell.substr(2)),
        filter: textFilter()
    }
];

class Courses extends React.Component {

    componentDidMount() {
        if (this.props.courses.loaded === LoadingState.NOT_LOADED)
            this.props.fetchCompleted(this.props.user.user_id);
    }

    render() {
        if (this.props.courses.loaded === LoadingState.NOT_LOADED) return this.loading();
        if (this.props.courses.loaded === LoadingState.LOADING) return this.loading();
        if (this.props.courses.loaded === LoadingState.LOADED) return this.loaded();
        if (this.props.courses.loaded === LoadingState.ERRORED) return this.error();
    }

    loading() {
        return <div id="loading">
            <div id="loading-inner" className="text-center">
                <Spinner id="spinner" animation="border" />
                <h2>Fetching your courses...</h2>
            </div>
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
                <BootstrapTable bootstrap4={true} keyField="index" columns={columns} data={this.props.courses.completed} striped bordered hover classes={"table-secondary"} filter={filterFactory()} />
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