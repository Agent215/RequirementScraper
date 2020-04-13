import {
    CLEAR_COMPLETED,
    FETCH_COMPLETED_DONE,
    FETCH_COMPLETED_ERROR,
    FETCH_COMPLETED_START,
    SET_COMPLETED
} from "./types";
import {getCompletedCourses} from "../api";

export const setCompleted = (completed) => ({ type: SET_COMPLETED, completed });
export const clearCompleted = () => ({ type: CLEAR_COMPLETED });
export const fetchCompletedStart = () => ({ type: FETCH_COMPLETED_START });
export const fetchCompletedDone = () => ({ type: FETCH_COMPLETED_DONE });
export const fetchCompletedError = (error) => ({ type: FETCH_COMPLETED_ERROR, error });
export const fetchCompleted = (user_id) => (dispatch) => {
    dispatch(fetchCompletedStart());
    getCompletedCourses(user_id)
        .then(data => dispatch(setCompleted(Object.values(data))))
        .then(() => dispatch(fetchCompletedDone()))
        .catch(err => dispatch(fetchCompletedError(err)));
};