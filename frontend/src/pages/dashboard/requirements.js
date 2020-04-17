import React from "react";
import {connect} from "react-redux";
import {fetchRequirements} from "../../actions/requirements";
import {Alert, ButtonGroup, Jumbotron, Spinner} from "react-bootstrap";
import ThemedCard from "../../components/card";
import ThemedButton from "../../components/button";
import LoadingState from "../../reducers/loadingState";
import {Status} from "../../reducers/requirements";

function getPrimaryFromStatus(status) {
    switch (status) {
        case Status.Completed:
            return "success";
        case Status.InProgress:
            return "info";
        case Status.Incomplete:
            return "danger";
        default:
            return "secondary"
    }
}

function normalizeStatus(status) {
    return status.toLowerCase().replace(/\s+/g, '');
}

class Course extends React.Component {
    render() {
        return <span className="p-2">{this.props.course}</span>
    }
}

class Subrequirement extends React.Component {
    render() {
        const title = this.props.data.subrequirement ? this.props.data.subrequirement : "";
        const id = "requirement_" + this.props.id;
        const headerId = "req_header_" + this.props.id;

        const status = this.props.data.Status || this.props.reqStatus;

        const expanded = title.length < 1;
        const collapseClasses = expanded ? "" : ["collapse", "subreq-collapse"].join(" ");
        const headerBg = "bg-" + getPrimaryFromStatus(status);

        return <div className={"subrequirement my-2 " + normalizeStatus(status)}>
            <ThemedCard>
                <div className={["card-header", headerBg].join(" ")} id={headerId}>
                    <h2 className="mb-0">
                        {
                            expanded ? "" : <button className="btn btn-link text-light" type="button" data-toggle="collapse" data-target={"#" + id} aria-expanded={expanded ? "true" : "false"} aria-controls={id}>
                                { title }
                            </button>
                        }
                    </h2>
                </div>
                <div id={id} className={collapseClasses} aria-labelledby={headerId}>
                    <div className="card-body">
                        <p><strong>
                            { status === Status.Incomplete ? `You need ${this.props.data.Needs} to fulfill this requirement` : "" }
                            { status === Status.InProgress ? "You are currently registered for courses that will fulfill this requirement" : "" }
                            { status === Status.Completed ? "You have completed all the courses necessary to fulfill this requirement" : "" }
                        </strong></p>
                        { this.showCourses() }
                    </div>
                </div>
            </ThemedCard>
        </div>
    }

    showCourses() {
        const taken = Object.entries(this.props.data.CoursesTaken || this.props.data.TakenCourses || {});
        const select = Object.entries(this.props.data.SelectFrom || {});
        const inProgress = Object.entries(this.props.data.CoursesInProgress || {});

        return <>
            {
                inProgress.length > 0 ? <p>
                    In progress courses:
                    { inProgress.map(([ key, course ]) => <Course key={key} course={course} />)   }
                </p> : ""
            }
            {
                taken.length > 0 ? <p>
                    Completed courses:
                    { taken.map(([ key, course ]) => <Course key={key} course={course} />)   }
                </p> : ""
            }
            {
                select.length > 0 ? <p>
                    Select from:
                    { select.map(([ key, course ]) => <Course key={key} course={course} />)   }
                </p> : ""
            }
        </>;
    }
}

class RequirementComponent extends React.Component {
    render() {
        const id = "requirement_" + this.props.id;
        const headerId = "req_header_" + this.props.id;
        const headerBg = "bg-" + getPrimaryFromStatus(this.props.data.Status);

        return <div className={"requirement my-2 " + normalizeStatus(this.props.data.Status)}>
            <ThemedCard>
                <div className={["card-header", headerBg].join(" ")} id={headerId}>
                    <h2 className="mb-0">
                        <button className="btn btn-link text-light" type="button" data-toggle="collapse" data-target={"#" + id} aria-expanded="false" aria-controls={id}>
                            { this.props.data.Title }
                        </button>
                    </h2>
                </div>
                <div id={id} className="collapse req-collapse" aria-labelledby={headerId}>
                    <div className="card-body">
                        { Object.entries(this.props.data.subrequirements).map(([key, data]) => <Subrequirement key={key} id={`${this.props.id}_${key}`} data={data} reqStatus={this.props.data.Status}  />) }
                    </div>
                </div>
            </ThemedCard>
        </div>
    }
}
const Requirement = connect(({ theme }) => ({theme}), null)(RequirementComponent);

class Requirements extends React.Component {
    componentDidMount() {
        if (this.props.requirements.loaded !== LoadingState.LOADED)
            this.props.fetchRequirements(this.props.user.user_id);
    }

    expandAll() {
        window.$(".requirement .collapse").collapse('show');
    }

    collapseSubreqs() {
        window.$(".subreq-collapse").collapse('hide');
    }

    collapseAll() {
        window.$(".requirement .collapse").collapse('hide');
    }

    expandIncomplete() {
        window.$(".requirement.incomplete .req-collapse, .subrequirement.incomplete .subreq-collapse").collapse('show');
    }

    render() {
        if (this.props.requirements.loaded === LoadingState.NOT_LOADED) return this.loading();
        if (this.props.requirements.loaded === LoadingState.LOADING) return this.loading();
        if (this.props.requirements.loaded === LoadingState.LOADED) return this.loaded();
        if (this.props.requirements.loaded === LoadingState.ERRORED) return this.error();
    }

    loading() {
        return <div id="loading">
            <div id="loading-inner" className="text-center">
                <Spinner id="spinner" animation="border" />
                <h2>Fetching your requirements...</h2>
                <p>
                    If you have two factor authentication enabled on your Temple account, you may either get
                    a push notification, phone call, or text message. Make sure to complete this verification step
                    or else we cannot retrieve your data.
                </p>
            </div>
        </div>
    }

    loaded() {
        const bg = this.props.theme.dark ? "bg-secondary" : "bg-gray";
        return <div>
            <Jumbotron className={bg}>
                <h1>Requirements</h1>
                <p>
                    The following are all of the requirements you need to fulfill in order to graduate.
                    Each requirement is divided up as subrequirements, although some only have one "subrequirement".
                    When the subrequirement's header is <span className="text-danger">red</span> you have not completed the
                    subrequirement, and when it is <span className="text-success">green</span> you have completed it.
                    When the header is <span className="text-info">blue</span> it is in progress, which means you're
                    already registered for the correct amount of classes but haven't completed those courses.
                    To view more info about a requirement or subrequirement, click it's title.
                </p>
            </Jumbotron>
            <div id="requirements" className="container-fluid mt-2">
                <ButtonGroup size="sm">
                    <ThemedButton onClick={this.collapseSubreqs}>Collapse Subrequirements</ThemedButton>
                    <ThemedButton onClick={this.collapseAll}>Collapse All</ThemedButton>
                    <ThemedButton onClick={this.expandAll}>Expand All</ThemedButton>
                    <ThemedButton onClick={this.expandIncomplete}>Expand Incomplete</ThemedButton>
                </ButtonGroup>

                { this.props.requirements.requirements.map((data, i) => <Requirement key={i} id={i} data={data} />) }
            </div>
        </div>
    }

    error() {
        return <div className="container-fluid mt-2"><Alert variant="danger">
            <Alert.Heading>Oh no!</Alert.Heading>
            <p>
                Failed to fetch your requirements list!
            </p>
        </Alert></div>
    }
}

export default connect(({ requirements, user, theme }) => ({ requirements, user, theme }), { fetchRequirements })(Requirements);