import React from "react";
import {setTheme} from "../actions/theme";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {Themes} from "../reducers/theme";

class Footer extends React.Component {
    render() {
        return <footer>
            <div className="float-right"><small className="mr-2">Select your theme:</small>
            {
                Object.entries(Themes).map(([name, theme]) => <Button onClick={() => this.props.setTheme(theme)} className={["badge", "badge-pill", "badge-" + theme, "theme-picker"]}>
                    <span className="sr-only">{name} Theme</span>
                </Button>)
            }
            </div>
        </footer>
    }
}

export default connect(null, { setTheme })(Footer);