import {CLEAR_USER, SET_USER} from "../actions/types";

const initialState = null;

export default (state, action) => {
    if (state === undefined) state = initialState;
    switch (action.type) {
        case SET_USER:
            return {
                user_id: action.user_id,
                username: action.username,
                password: action.password
            };
        case CLEAR_USER:
            return null;
        default:
            return state;
    }
};

