import {LOG_IN, LOG_OUT, LOGGING_IN} from "./types";

export const logIn = () => ({ type: LOG_IN });
export const loggingIn = () => ({ type: LOGGING_IN });
export const logOut = () => ({ type: LOG_OUT });