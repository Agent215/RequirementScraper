import {SET_COMPLETED, SET_REQUIREMENTS} from "../actions/types";

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

export default (state, action) => {
    return {
        completed: completedReducer(state.completed, action),
        required: requiredReducer(state.required, action)
    };
};