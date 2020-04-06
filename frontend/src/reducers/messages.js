import {ADD_MESSAGE, REMOVE_MESSAGE} from "../actions/types";
import {v4 as uuidv4} from "uuid";

const initialState = {};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            return Object.assign({}, state, { [uuidv4()]: action.message });
        case REMOVE_MESSAGE:
            delete state[action.messageId];
            return state;
        default:
            return state;
    }
}
