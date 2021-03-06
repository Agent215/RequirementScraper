import {ADD_MESSAGE, REMOVE_MESSAGE} from "../actions/types";
import {v4 as uuidv4} from "uuid";

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            return Object.assign({}, state, { [uuidv4()]: action.message });
        case REMOVE_MESSAGE:
            const newState = Object.assign({}, state);
            delete newState[action.messageId];
            return newState;
        default:
            return state;
    }
}
