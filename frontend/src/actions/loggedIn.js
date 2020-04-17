import {LOG_IN, LOG_OUT, LOGGING_IN} from "./types";
import {clearUser} from "./user";
import {clearRequirements} from "./requirements";
import {clearCompleted} from "./courses";
import {clearStatistics} from "./statistics";

export const loggedIn = () => ({ type: LOG_IN });
export const loggingIn = () => ({ type: LOGGING_IN });
export const loggedOut = () => ({ type: LOG_OUT });

export const doLogOut = () => (dispatch) => {
    dispatch(loggedOut());
    dispatch(clearUser());
    dispatch(clearRequirements());
    dispatch(clearCompleted());
    dispatch(clearStatistics());
};