import LoadingState from "./loadingState";
import {
    CLEAR_STATISTICS,
    FETCH_STATISTICS_DONE, FETCH_STATISTICS_ERROR,
    FETCH_STATISTICS_START,
    SET_STATISTICS
} from "../actions/types";

const initialState = {
    statistics: [],
    loaded: LoadingState.NOT_LOADED,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STATISTICS:
            const reqsTotal = action.statistics.requirements.requirementCount;
            const reqsCompleted = action.statistics.requirements.requirementsDone;
            const reqsInProgress = action.statistics.requirements.requirementsIP;
            const reqsIncomplete = reqsTotal - reqsCompleted - reqsInProgress;

            const creditsTotal = 123;
            const creditsEarned = action.statistics.totalCredits.totalCredits;
            const creditsRegistered = action.statistics.totalCredits.registeredCredits;
            const creditsRemaining = creditsTotal - creditsEarned - creditsRegistered;

            return Object.assign({}, state, {
                statistics: {
                    gpa: [
                        { index: "Cumulative", GPA: action.statistics.GPA }
                    ],
                    requirements: [
                        {
                            id: "completed",
                            label: "Completed",
                            value: reqsCompleted,
                            color: "#28a745"
                        },
                        {
                            id: "inProgress",
                            label: "In Progress",
                            value: reqsInProgress,
                            color: "#17a2b8"
                        },
                        {
                            id: "incomplete",
                            label: "Incomplete",
                            value: reqsIncomplete,
                            color: "#dc3545"
                        },
                    ],
                    credits: [
                        {
                            id: "earned",
                            label: "Earned",
                            value: creditsEarned,
                            color: "#28a745"
                        },
                        {
                            id: "registered",
                            label: "Registered",
                            value: creditsRegistered,
                            color: "#17a2b8"
                        },
                        {
                            id: "remaining",
                            label: "Remaining",
                            value: creditsRemaining,
                            color: "#dc3545"
                        },
                    ]
                }
            });
        case CLEAR_STATISTICS:
            return initialState;
        case FETCH_STATISTICS_DONE:
            return Object.assign({}, state, { loaded: LoadingState.LOADED });
        case FETCH_STATISTICS_START:
            return Object.assign({}, state, { loaded: LoadingState.LOADING, error: null });
        case FETCH_STATISTICS_ERROR:
            return Object.assign({}, state, { loaded: LoadingState.ERRORED, error: action.error });
        default:
            return state;
    }
};