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

export default (state = initalState, action) => {
    state.completed = completedReducer(state.completed, action);
    state.required = requiredReducer(state.required, action);

    const isAPI = action.payload === FETCH_COMPLETED || action.payload === FETCH_REQUIREMENTS;
    switch (action.type) {
        case API_START:
            return isAPI ? Object.assign({}, state, { loading: true }) : state;
        case API_END:
            return isAPI ? Object.assign({}, state, { loading: false }) : state;
        default:
            return state;
    }
};