import {CLEAR_USER, SET_USER} from "./types";
import {loggedIn, loggedOut, loggingIn} from "./loggedIn";
import * as api from "../api";
import {deleteFailed, deleteSuccessful, deleting, resetDeleting} from "./deleting";

export const setUser = (user_id, username, password) => ({ type: SET_USER, user_id, username, password });
export const clearUser = () => ({ type: CLEAR_USER });

export const sendCredentials = (username, password) => (dispatch) => {
    dispatch(loggingIn());
    api.login(username, password)
        .then(data => dispatch(setUser(data.user_id, username, password)))
        .then(() => dispatch(loggedIn()))
        .catch(err => {
            console.error(err);
            dispatch(loggedOut());
        });
};

export const editUserData = (user_id, username, password) => (dispatch) => {
    dispatch(loggingIn());
    api.editUser(user_id, username, password)
        .then(() => dispatch(setUser(user_id, username, password)))
        .then(() => dispatch(loggedIn()))
        .catch(err => {
            console.error(err);
            dispatch(loggedOut());
        });
};

export const deleteUserData = (user_id) => (dispatch) => {
    dispatch(deleting());
    api.deleteUserData(user_id)
        .then(() => dispatch(deleteSuccessful()))
        .catch(err => {
            dispatch(deleteFailed());
            console.error(err)
        });
};

export const deleteAllUserData = (user_id) => (dispatch) => {
    dispatch(deleting());
    api.deleteAllUserData(user_id)
        .then(() => dispatch(resetDeleting()))
        .then(() => dispatch(loggedOut()))
        .catch(err => {
            dispatch(deleteFailed());
            console.error(err)
        });
};