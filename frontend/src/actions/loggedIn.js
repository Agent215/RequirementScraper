import {LOG_IN, LOG_OUT, LOGGING_IN} from "./types";

export const loggedIn = () => ({ type: LOG_IN });
export const loggingIn = () => ({ type: LOGGING_IN });
export const loggedOut = () => ({ type: LOG_OUT });