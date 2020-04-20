import React from "react";
import {setTheme, toggleDark} from "../actions/theme";
import {connect} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {Themes} from "../reducers/theme";

class ThemeItemClass extends React.Component {
    render() {
        return <Button onClick={() => this.props.setTheme(this.props.theme)}
                       className={["badge", "badge-pill", "badge-" + this.props.theme, "theme"]}>
            <span className="sr-only">{this.props.name} Theme</span>
        </Button>
    }
}
const ThemeItem = connect(null, { setTheme })(ThemeItemClass);


class ThemePicker extends React.Component {
    render() {
        return <div id="theme-picker">
            <small className="mr-2">Select your theme:</small>
            { Object.entries(Themes).map(([name, theme]) => <ThemeItem key={name} name={name} theme={theme}/>) }
        </div>
    }
}

class DarkModeSwitchClass extends React.Component {
    toggleCheckboxChange = () => {
        this.props.toggleDark();
        return false
    };

    render() {
        return <div id="dark-mode-switch">
            <small className="mr-2">
                <Form.Check type="switch" id="dark-mode" label="Dark mode" checked={this.props.theme.dark} onChange={this.toggleCheckboxChange} />
            </small>
        </div>
    }
}
const DarkModeSwitch = connect(({ theme }) => ({ theme }), { toggleDark })(DarkModeSwitchClass);

class Footer extends React.Component {
    render() {
        const bg = this.props.theme.dark ? "bg-secondary" : "bg-gray";
        return <footer className={`${bg} clear-fix`}>
            <div className="float-right">
                <DarkModeSwitch />
                <ThemePicker />
            </div>
        </footer>
    }
}

export default connect(({ theme }) => ({ theme }), { setTheme })(Footer);