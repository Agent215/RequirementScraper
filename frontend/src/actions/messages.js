import {ADD_MESSAGE, REMOVE_MESSAGE} from "./types";
import {faExclamationTriangle, faInfoCircle, faThumbsUp} from "@fortawesome/free-solid-svg-icons";

export const addMessage = (variant, header, text, icon = null) => ({ type: ADD_MESSAGE, message: { variant, header, text, icon } });
export const errorMessage = (text) => addMessage("danger", "uh oh!", text, faExclamationTriangle);
export const warningMessage = (text) => addMessage("warning", "hmmm...", text, faExclamationTriangle);
export const infoMessage = (text) => addMessage("info", "info", text, faInfoCircle);
export const successMessage = (text) => addMessage("success", "success!", text, faThumbsUp);
export const removeMessage = (messageId) => ({ type: REMOVE_MESSAGE, messageId });