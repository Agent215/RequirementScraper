import {SEND_CREDENTIALS, SET_USER} from "./types";
import {fetchAction} from "./api";
import {loggedIn} from "./loggedIn";

export const setUser = (user_id, username, password) => ({ type: SET_USER, user_id, username, password });

export const sendCredentialsCompleted = (user_id, username, password) => (dispatch) => {
    dispatch(setUser(user_id, username, password));
    dispatch(loggedIn());
};

export const sendCredentials = (username, password) => fetchAction({
    url: "/api/credentials",
    method: "POST",
    onSuccess: ({ user_id }) => sendCredentialsCompleted(user_id, username, password),
    onFailure: err => console.error("API Error: " + err),
    data: { username, password },
    label: SEND_CREDENTIALS
});