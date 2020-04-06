import {removeMessage} from "../actions/messages";
import React from "react";
import {connect} from "react-redux";

class Messages extends React.Component {
}

export default connect(({ messages }) => ({ messages }), { removeMessage })(Messages);