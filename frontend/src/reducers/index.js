import user from "./user";
import logged_in from "./loggedIn";
import courses from "./courses";
import requirements from "./requirements";
import theme from "./theme";
import deleting from "./deleting";
import {combineReducers} from "redux";

export default combineReducers({
    user, logged_in, courses, requirements, theme, deleting
});