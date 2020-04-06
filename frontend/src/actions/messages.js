import {ADD_MESSAGE, REMOVE_MESSAGE} from "./types";

export const addMessage = (level, message) => ({ type: ADD_MESSAGE, message: { level, message } });
export const removeMessage = (messageId) => ({ type: REMOVE_MESSAGE, messageId });