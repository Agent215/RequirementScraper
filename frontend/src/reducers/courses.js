import {
    API_END,
    API_START,
    FETCH_COMPLETED,
    FETCH_REQUIREMENTS,
    SET_COMPLETED,
    SET_REQUIREMENTS
} from "../actions/types";

const completedReducer = (state = [], action) => {
    switch (action.type) {
        case SET_COMPLETED:
            return action.completed;
        default:
            return state;
    }
};

const requiredReducer = (state = [], action) => {
    switch (action.type) {
        case SET_REQUIREMENTS:
            return action.required;
        default:
            return state;
    }
};

const initalState = { completed: [], required: [], loading: false };

export default (state, action) => {
    if (state === undefined) state = initalState;
    const newState = {
        completed: completedReducer(state.completed, action),
        required: requiredReducer(state.required, action),
        loading: state.loading || true
    };

    const isAPI = action.payload === FETCH_COMPLETED || action.payload === FETCH_REQUIREMENTS;
    switch (action.type) {
        case API_START:
            if (isAPI)
                newState.loading = true;
            break;
        case API_END:
            if (isAPI)
                newState.loading = false;
            break;
    }

    return newState;
};