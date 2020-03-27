import {SET_CREDENTIALS} from "../actions/types";

const initialState = null;

export default (state, action) => {
    if (state === undefined) state = initialState;
    switch (action.type) {
        case SET_CREDENTIALS:
            return {
                username: action.username,
                password: action.password
            };
        default:
            return state;
    }
};

