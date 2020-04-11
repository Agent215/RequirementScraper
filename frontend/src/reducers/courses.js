import {FETCH_COMPLETED_DONE, FETCH_COMPLETED_START, FETCH_COMPLETED_ERROR, SET_COMPLETED} from "../actions/types";

const initialState = {
    completed: [],
    loaded: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPLETED:
            const completed = [];
            for (let i = 0; i < action.completed.length; i++)
                completed.push(Object.assign({}, {index: i}, action.completed[i]));
            return Object.assign({}, state, {completed});
        case FETCH_COMPLETED_DONE:
            return Object.assign({}, state, {loaded: true});
        case FETCH_COMPLETED_START:
            return Object.assign({}, state, {loaded: false, error: null});
        case FETCH_COMPLETED_ERROR:
            return Object.assign({}, state, { error: action.error });
        default:
            return state;
    }
};