import {combineReducers} from "redux";
import user from "./user";
import logged_in from "./loggedIn";
import courses from "./courses";
import requirements from "./requirements";
import theme from "./theme";
import deleting from "./deleting";
import messages from "./messages";
import statistics from "./statistics";

export default combineReducers({
    user, logged_in, courses, requirements, theme, deleting, messages, statistics
});