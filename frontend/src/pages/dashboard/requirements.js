import React from "react";
import {connect} from "react-redux";
import {fetchRequirements} from "../../actions/requirements";
import {Alert, ButtonGroup, Spinner, Jumbotron} from "react-bootstrap";
import ThemedCard from "../../components/card";
import ThemedButton from "../../components/button";
import LoadingState from "../../reducers/loadingState";

class Course extends React.Component {
    render() {
        return <span className="p-2">{this.props.course}</span>
    }
}

class Subrequirement extends React.Component {
    render() {
        if (!this.props.data.subrequirement) return null;
        const id = "requirement_" + this.props.id;
        const headerId = "req_header_" + this.props.id;
        const completed = !this.props.data.hasOwnProperty("Needs");
        const courses = completed ? this.props.data.CoursesTaken : this.props.data.SelectFrom;
        const expanded = this.props.data.subrequirement.length < 1;
        const collapseClasses = expanded ? [] : ["collapse"];
        const headerBg = completed ? "bg-success" : "bg-danger";

        return <div className="subrequirement my-2">
            <ThemedCard>
                <div className={["card-header", headerBg].join(" ")} id={headerId}>
                    <h2 className="mb-0">
                        {
                            expanded ? "" : <button className="btn btn-link text-light" type="button" data-toggle="collapse" data-target={"#" + id} aria-expanded={expanded ? "true" : "false"} aria-controls={id}>
                                { this.props.data.subrequirement }
                            </button>
                        }
                    </h2>
                </div>
                <div id={id} className={collapseClasses} aria-labelledby={headerId}>
                    <div className="card-body">
                        <p><strong>
                            {
                                completed ? "You have completed this requirement, satisfied by the following courses" :
                                    `You need ${this.props.data.Needs} of the following courses to fulfill this requirement`
                            }
                        </strong></p>
                        { this.showCourses(courses) }
                    </div>
                </div>
            </ThemedCard>
        </div>
    }

    showCourses(courses) {
        if (courses === null || courses === undefined) return "Could not find courses";
        return <p>
            {Object.entries(courses).map(([key, course]) => <Course key={key} course={course} />)}
        </p>
    }
}

class RequirementComponent extends React.Component {
    render() {
        const id = "requirement_" + this.props.id;
        const headerId = "req_header_" + this.props.id;
        const textColor = this.props.theme.dark ? "text-light" : "text-dark";
        return <div className="requirement my-2">
            <ThemedCard>
                <div className="card-header" id={headerId}>
                    <h2 className="mb-0">
                        <button className={"btn btn-link " + textColor} type="button" data-toggle="collapse" data-target={"#" + id} aria-expanded="false" aria-controls={id}>
                            { this.props.title }
                        </button>
                    </h2>
                </div>
                <div id={id} className="collapse" aria-labelledby={headerId}>
                    <div className="card-body">
                        { Object.entries(this.props.subrequirements).map(([key, data]) => <Subrequirement key={key} id={`${this.props.id}_${key}`} data={data}  />) }
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
        window.$(".subrequirement .collapse").collapse('hide');
    }

    collapseAll() {
        window.$(".requirement .collapse").collapse('hide');
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
                    To view more info about a requirement or subrequirement, click it's title.
                </p>
            </Jumbotron>
            <div id="requirements" className="container-fluid mt-2">
                <ButtonGroup size="sm">
                    <ThemedButton onClick={this.collapseSubreqs}>Collapse Subrequirements</ThemedButton>
                    <ThemedButton onClick={this.collapseAll}>Collapse All</ThemedButton>
                    <ThemedButton onClick={this.expandAll}>Expand All</ThemedButton>
                </ButtonGroup>

                { this.props.requirements.requirements.map(({Title, subrequirements}, i) => <Requirement key={i} id={i} title={Title} subrequirements={subrequirements} />) }
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