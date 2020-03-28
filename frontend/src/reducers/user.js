import {SET_USER} from "../actions/types";

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
        default:
            return state;
    }
};

