import React from "react";
import {Card} from "react-bootstrap";
import connect from "react-redux/es/connect/connect";

class ThemedCard extends React.Component {
    render() {
        let cardProps = Object.assign({}, this.props);
        delete cardProps["theme"];
        delete cardProps["children"];
        delete cardProps["dispatch"];

        const bg = this.props.theme.dark ? "bg-secondary" : "bg-gray";

        const className = cardProps.hasOwnProperty("className") ? cardProps["className"] : [];
        className.push(bg);
        delete cardProps["className"];

        return <Card className={className} { ...cardProps }>{ this.props.children }</Card>
    }
}
export default connect(({ theme }) => ({ theme }))(ThemedCard);