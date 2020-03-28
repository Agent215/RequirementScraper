import {SEND_CREDENTIALS, SET_CREDENTIALS} from "./types";
import {fetchAction} from "./api";

export const setCredentials = (username, password) => ({ type: SET_CREDENTIALS, username, password });
export const sendCredentials = (username, password) => fetchAction({
    url: "/api/credentials",
    method: "POST",
    onSuccess: ({ username, password }) => setCredentials(username, password),
    onFailure: err => console.error("API Error: " + err),
    data: { username, password },
    label: SEND_CREDENTIALS
});