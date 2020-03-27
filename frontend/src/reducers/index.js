import credentials from "./credentials";
import logged_in from "./loggedIn";
import courses from "./courses";
import {combineReducers} from "redux";

export default combineReducers({
    credentials, logged_in, courses
});