import {removeMessage} from "../actions/messages";
import React from "react";
import {connect} from "react-redux";
import {Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Messages extends React.Component {
    onClose(messageId) {
        this.props.removeMessage(messageId);
    }

    render() {
        const mapMessages = ([messageId, message]) => {
            const variant = message.variant === "theme" ? this.props.theme.primary : message.variant;
            return <Alert key={messageId} onClose={this.onClose.bind(this, messageId)} variant={variant}
                          dismissible>
                <Alert.Heading>
                    {message.icon !== null ? <FontAwesomeIcon icon={message.icon} className="mr-2"/> : ""}
                    {message.header}
                </Alert.Heading>
                <p className="mb-0">{message.text}</p>
            </Alert>;
        };

        return <div id="messages">{Object.entries(this.props.messages).map(mapMessages)}</div>
    }
}

export default connect(({ messages, theme }) => ({ messages, theme }), { removeMessage })(Messages);