import {LOG_IN, LOG_OUT, LOGGING_IN} from "../actions/types";

export const LoggedInState = {
    LOGGED_OUT: 1 << 0,
    LOGGING_IN: 1 << 1,
    LOGGED_IN: 1 << 2
};

export default (state = LoggedInState.LOGGED_OUT, action) => {
    switch (action.type) {
        case LOG_IN:
            return LoggedInState.LOGGED_IN;
        case LOGGING_IN:
            return LoggedInState.LOGGING_IN;
        case LOG_OUT:
            return LoggedInState.LOGGED_OUT;
        default:
            return state;
    }
};