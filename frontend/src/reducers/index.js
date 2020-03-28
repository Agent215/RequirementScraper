import user from "./user";
import logged_in from "./loggedIn";
import courses from "./courses";
import theme from "./theme"
import {combineReducers} from "redux";

export default combineReducers({
    user, logged_in, courses, theme
});