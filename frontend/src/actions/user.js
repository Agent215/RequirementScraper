import {CLEAR_USER, SET_USER} from "./types";
import {loggedIn, loggedOut, loggingIn} from "./loggedIn";
import {login} from "../api";

export const setUser = (user_id, username, password) => ({ type: SET_USER, user_id, username, password });
export const clearUser = () => ({ type: CLEAR_USER });

export const sendCredentials = (username, password) => (dispatch) => {
    dispatch(loggingIn());
    login(username, password)
        .then(data => dispatch(setUser(data.user_id, username, password)))
        .then(() => dispatch(loggedIn()))
        .error(err => {
            console.error(err);
            dispatch(loggedOut());
        })
};