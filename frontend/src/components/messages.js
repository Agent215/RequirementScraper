import {removeMessage} from "../actions/messages";
import React from "react";
import {connect} from "react-redux";
import {Toast} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Messages extends React.Component {
    onClose(messageId) {
        this.props.removeMessage(messageId);
        this.forceUpdate();
    }

    render() {
        const bg = this.props.theme.dark ? "bg-dark" : "bg-light";
        const bgHeader = this.props.theme.dark ? "bg-secondary" : "bg-gray";
        const textColor = this.props.theme.dark ? "text-light" : "text-dark";
        return <div id="messages">
            {
                Object.entries(this.props.messages).map(([messageId, message]) => <Toast key={messageId} onClose={this.onClose.bind(this, messageId)} className={[bg, textColor]}>
                    <Toast.Header className={[bgHeader, textColor]}>
                        { message.icon !== null ? <FontAwesomeIcon icon={message.icon} className="mr-2" /> : "" }
                        <strong className="mn-auto">{ message.header }</strong>
                    </Toast.Header>
                    <Toast.Body>{ message.text }</Toast.Body>
                </Toast>)
            }
        </div>
    }
}

export default connect(({ messages, theme }) => ({ messages, theme }), { removeMessage })(Messages);