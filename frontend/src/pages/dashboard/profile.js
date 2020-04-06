import React from "react";
import {Container, Card, Button, ButtonGroup, Spinner} from "react-bootstrap";
import ThemedCard from "../../components/card";
import LoginForm from "../../components/loginForm";
import {connect} from "react-redux";
import {deleteAllUserData, deleteUserData, editUserData} from "../../actions/user";
import {DeletingState} from "../../reducers/deleting";
import {Themes} from "../../reducers/theme";

class Profile extends React.Component {
    render() {
        const outline = this.props.theme.dark ? "text-outline-dark" : "text-outline-light";
        const highContrast = this.props.theme.primary === Themes.Contrast;
        const textClasses = [highContrast ? "font-weight-bold" : "", highContrast ? outline : ""];
        const success = textClasses.slice();
        success.push("text-success");
        const failed = textClasses.slice();
        failed.push("text-failed");
        const deletingInProgress = this.props.deleting.state === DeletingState.InProgress;
        return <Container>
            <ThemedCard className={[ "my-5", "p-5" ]}><Card.Body>
                <h1 className="mb-5">Edit your AccessNet credentials</h1>
                <LoginForm onSubmit={this.props.editUserData.bind(this, this.props.user.user_id)} loading={false}/>

                <ButtonGroup className="mt-5">
                    <Button variant={this.props.theme.dark ? "light" : "secondary"} onClick={() => this.props.deleteUserData(this.props.user.user_id)} disabled={deletingInProgress}>Delete user data</Button>
                    <Button variant="danger" onClick={() => this.props.deleteAllUserData(this.props.user.user_id)} disabled={deletingInProgress}>Delete ALL data (including credentials)</Button>
                </ButtonGroup>
                {this.props.deleting.state === DeletingState.NotDeleting ? "" :
                    <div className="mt-3">
                        {deletingInProgress ? <span><Spinner animation="border"/> Deleting user data...</span> : ""}
                        {this.props.deleting.state === DeletingState.Successful ?
                            <span className={success.join(" ")}>Deleted user data successfully</span> : ""}
                        {this.props.deleting.state === DeletingState.Failed ?
                            <span className={failed.join(" ")}>Failed to delete user data</span> : ""}
                    </div>
                }
            </Card.Body></ThemedCard>
        </Container>
    }
}

export default connect(({ theme, logged_in, user, deleting }) => ({ theme, logged_in, user, deleting }), { editUserData, deleteUserData, deleteAllUserData })(Profile);