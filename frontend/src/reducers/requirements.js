import {
    CLEAR_REQUIREMENTS,
    FETCH_REQUIREMENTS_DONE,
    FETCH_REQUIREMENTS_ERROR,
    FETCH_REQUIREMENTS_START,
    SET_REQUIREMENTS
} from "../actions/types";
import LoadingState from "./loadingState";

export const Status = {
    Incomplete: "INCOMPLETE", InProgress: "IN PROGRESS", Completed: "COMPLETE"
};

const initialState = {
    requirements: [],
    loaded: LoadingState.NOT_LOADED,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REQUIREMENTS:
            return Object.assign({}, state, { requirements: action.required });
        case CLEAR_REQUIREMENTS:
            return initialState;
        case FETCH_REQUIREMENTS_DONE:
            return Object.assign({}, state, { loaded: LoadingState.LOADED });
        case FETCH_REQUIREMENTS_START:
            return Object.assign({}, state, { loaded: LoadingState.LOADING, error: null });
        case FETCH_REQUIREMENTS_ERROR:
            return Object.assign({}, state, { loaded: LoadingState.ERRORED, error: action.error });
        default:
            return state;
    }
};