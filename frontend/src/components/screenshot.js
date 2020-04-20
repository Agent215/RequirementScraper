import {Card} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";

class ThemedScreenshot extends React.Component {
    render() {
        for (let format of this.props.formats) {
            if (format.primary === this.props.theme.primary && format.dark === this.props.theme.dark)
                return <Card.Img variant="top" src={format.src} />
        }
        return null;
    }
}

export default connect(({ theme }) => ({ theme }), null)(ThemedScreenshot);