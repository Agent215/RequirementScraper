import {ADD_MESSAGE, REMOVE_MESSAGE} from "./types";
import {faExclamationTriangle, faInfoCircle, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

export const addMessage = (header, text, icon = null) => ({ type: ADD_MESSAGE, message: { header, text, icon } });
export const errorMessage = (text) => addMessage("uh oh!", text, faExclamationTriangle);
export const warningMessage = (text) => addMessage("hmmm...", text, faExclamationTriangle);
export const infoMessage = (text) => addMessage("info", text, faInfoCircle);
export const successMessage = (text) => addMessage("info", text, faThumbsUp);
export const removeMessage = (messageId) => ({ type: REMOVE_MESSAGE, messageId });