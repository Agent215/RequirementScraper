import {LOG_IN, LOG_OUT} from "./types";

export const logIn = () => ({ type: LOG_IN });
export const logOut = () => ({ type: LOG_OUT });