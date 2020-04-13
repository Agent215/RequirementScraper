import {
    FETCH_COMPLETED_DONE,
    FETCH_COMPLETED_START,
    FETCH_COMPLETED_ERROR,
    SET_COMPLETED,
    CLEAR_COMPLETED
} from "../actions/types";
import LoadingState from "./loadingState";

const initialState = {
    completed: [],
    loaded: LoadingState.NOT_LOADED,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPLETED:
            const completed = [];
            for (let i = 0; i < action.completed.length; i++)
                completed.push(Object.assign({}, {index: i}, action.completed[i]));
            return Object.assign({}, state, {completed});
        case CLEAR_COMPLETED:
            return initialState;
        case FETCH_COMPLETED_DONE:
            return Object.assign({}, state, {loaded: LoadingState.LOADED});
        case FETCH_COMPLETED_START:
            return Object.assign({}, state, {loaded: LoadingState.LOADING, error: null});
        case FETCH_COMPLETED_ERROR:
            return Object.assign({}, state, {loaded: LoadingState.ERRORED, error: action.error});
        default:
            return state;
    }
};