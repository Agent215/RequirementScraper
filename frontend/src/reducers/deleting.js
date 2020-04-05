import {DELETE_FAILED, DELETE_RESET, DELETE_SUCCESSFUL, DELETING} from "../actions/types";

export const DeletingState = {
    NotDeleting: 1 << 0,
    InProgress: 1 << 1,
    Successful: 1 << 2,
    Failed: 1 << 3
};

const initialState = {
    state: DeletingState.NotDeleting,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_RESET:
            return initialState;
        case DELETING:
            return { state: DeletingState.InProgress, error: null };
        case DELETE_SUCCESSFUL:
            return { state: DeletingState.Successful, error: null };
        case DELETE_FAILED:
            return { state: DeletingState.Failed, error: action.error };
        default:
            return state;
    }
}

