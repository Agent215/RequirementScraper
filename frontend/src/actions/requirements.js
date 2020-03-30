import {FETCH_REQUIREMENTS_DONE, FETCH_REQUIREMENTS_ERROR, FETCH_REQUIREMENTS_START, SET_REQUIREMENTS} from "./types";
import {getRequirements} from "../api";

export const setRequirements = (required) => ({type: SET_REQUIREMENTS, required});
export const fetchRequirementsStart = () => ({type: FETCH_REQUIREMENTS_START});
export const fetchRequirementsDone = () => ({type: FETCH_REQUIREMENTS_DONE});
export const fetchRequirementsError = (error) => ({type: FETCH_REQUIREMENTS_ERROR, error});
export const fetchRequirements = (user_id) => (dispatch) => {
    dispatch(fetchRequirementsStart());
    getRequirements(user_id)
        .then(data => dispatch(setRequirements(data)))
        .then(() => dispatch(fetchRequirementsDone()))
        .catch(err => dispatch(fetchRequirementsError(err)));
};