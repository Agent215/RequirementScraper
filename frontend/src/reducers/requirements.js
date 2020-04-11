import {
    FETCH_REQUIREMENTS_DONE,
    FETCH_REQUIREMENTS_ERROR,
    FETCH_REQUIREMENTS_START,
    SET_REQUIREMENTS
} from "../actions/types";

const initialState = {
    requirements: [],
    loaded: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REQUIREMENTS:
            return Object.assign({}, state, { requirements: action.required });
        case FETCH_REQUIREMENTS_DONE:
            return Object.assign({}, state, { loaded: true });
        case FETCH_REQUIREMENTS_START:
            return Object.assign({}, state, { loaded: false, error: null });
        case FETCH_REQUIREMENTS_ERROR:
            return Object.assign({}, state, { error: action.error });
        default:
            return state;
    }
};