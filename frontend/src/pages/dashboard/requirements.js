import React from "react";
import {connect} from "react-redux";
import {fetchRequirements} from "../../actions/requirements";
import {Alert, Spinner} from "react-bootstrap";

class Course extends React.Component {
    render() {
        return <span>{this.props.course}</span>
    }
}

class Subrequirement extends React.Component {
    render() {
        const completed = this.props.data.Needs;
        const courses = Object.entries(completed ? this.props.data.CompletedCourses : this.props.data.SelectFrom);

        return <div className="subrequirement">
            <h3>{ this.props.title }</h3>
            <div className="collapse card">
                <div className="card-body">
                    <p><strong>
                        {
                            completed ? "You have completed this requirement, satisfied by the following courses" :
                                `You need ${this.props.data.Needs} credits of the following courses to fulfill this requirement`
                        }
                    </strong></p>
                    <p>
                        {courses.map(([key, course]) => <Course key={key} course={course} />)}
                    </p>
                </div>
            </div>
        </div>
    }
}

class Requirement extends React.Component {
    render() {
        return <div className="requirement">
            <h2>{ this.props.title }</h2>
            <div className="collapse card">
                <div className="card-body">
                    { this.props.subrequirements.map((data, i) => <Subrequirement key={i} data={data}  />) }
                </div>
            </div>
        </div>
    }
}

class Requirements extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        if (!this.props.requirements.loaded) {
            this.props.fetchRequirements(this.props.user.user_id);
            this.setState({ loading: true });
        }
    }

    render() {
        if (this.state.loading && this.props.requirements.loaded) this.setState({ loading: false });

        return <div>
            <h1>Requirements</h1>
            { this.props.requirements.error !== null ? this.error() : (this.state.loading ? this.loading() : this.loaded()) }
        </div>
    }

    loading() {
        return <div className="text-center">
            <Spinner animation="border" />
            <h2>Fetching your requirements...</h2>
        </div>
    }

    loaded() {
        return <>
            <h2>These are the requirements you need to fulfill to graduate</h2>
            <div id="requirements">
                { this.props.requirements.map(({Title: title, subrequirements}, i) => <Requirement key={i} title={title} subrequirements={subrequirements} />) }
            </div>
        </>
    }

    error() {
        return <Alert variant="danger">
            <Alert.Heading>Oh no!</Alert.Heading>
            <p>
                Failed to fetch your requirements list!
            </p>
        </Alert>
    }
}

export default connect(({ requirements, user }) => ({ requirements, user }), { fetchRequirements })(Requirements);