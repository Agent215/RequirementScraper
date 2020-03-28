import {SEND_CREDENTIALS, SET_USER} from "./types";
import {fetchAction} from "./api";

export const setUser = (user_id, username, password) => ({ type: SET_USER, user_id, username, password });
export const sendCredentials = (username, password) => fetchAction({
    url: "/api/credentials",
    method: "POST",
    onSuccess: ({ user_id }) => setUser(user_id, username, password),
    onFailure: err => console.error("API Error: " + err),
    data: { username, password },
    label: SEND_CREDENTIALS
});