import {FETCH_COMPLETED, SET_COMPLETED} from "./types";
import {fetchAction} from "./api";

export const setCompleted = (completed) => ({ type: SET_COMPLETED, completed });
export const fetchCompleted = (userId) => fetchAction({
    url: "/api/courses/" + userId,
    onSuccess: setCompleted,
    onFailure: err => console.error("API Error: " + err),
    label: FETCH_COMPLETED
});