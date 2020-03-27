import {FETCH_REQUIREMENTS, SET_REQUIREMENTS} from "./types";
import {fetchAction} from "./api";

export const setRequirments = (required) => ({ type: SET_REQUIREMENTS, required });
export const fetchRequirements = () => fetchAction({
    url: "",
    onSuccess: setRequirments,
    onFailure: err => console.error("API Error: " + err),
    label: FETCH_REQUIREMENTS
});