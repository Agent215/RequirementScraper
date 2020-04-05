import {DELETE_FAILED, DELETE_RESET, DELETE_SUCCESSFUL, DELETING} from "./types";

export const resetDeleting = () => ({ type: DELETE_RESET });
export const deleting = () => ({ type: DELETING });
export const deleteSuccessful = () => ({ type: DELETE_SUCCESSFUL });
export const deleteFailed = (error) => ({ type: DELETE_FAILED, error });