import React from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";

class ThemedButton extends React.Component {
    render() {
        let btnProps = Object.assign({}, this.props);
        delete btnProps["theme"];
        delete btnProps["children"];
        delete btnProps["outline"];
        delete btnProps["dispatch"];

        const outline = this.props.outline || false;
        let variant = this.props.theme.primary;
        if (outline) variant = "outline-" + variant;

        return <Button variant={variant} { ...btnProps }>{ this.props.children }</Button>
    }
}
export default connect(({ theme }) => ({ theme }))(ThemedButton);