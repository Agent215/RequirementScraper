import user from "./user";
import logged_in from "./loggedIn";
import courses from "./courses";
import {combineReducers} from "redux";

export default combineReducers({
    user, logged_in, courses
});