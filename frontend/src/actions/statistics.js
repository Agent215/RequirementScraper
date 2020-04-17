import {
    CLEAR_STATISTICS,
    FETCH_STATISTICS_DONE,
    FETCH_STATISTICS_ERROR,
    FETCH_STATISTICS_START,
    SET_STATISTICS
} from "./types";
import {getStatistics} from "../api";

export const setStatistics = (statistics) => ({type: SET_STATISTICS, statistics});
export const clearStatistics = () => ({ type: CLEAR_STATISTICS });
export const fetchStatisticsStart = () => ({type: FETCH_STATISTICS_START});
export const fetchStatisticsDone = () => ({type: FETCH_STATISTICS_DONE});
export const fetchStatisticsError = (error) => ({type: FETCH_STATISTICS_ERROR, error});
export const fetchStatistics = (user_id) => (dispatch) => {
    dispatch(fetchStatisticsStart());
    getStatistics(user_id)
        .then(data => dispatch(setStatistics(data)))
        .then(() => dispatch(fetchStatisticsDone()))
        .catch(err => {
            console.error(err);
            dispatch(fetchStatisticsError(err));
        });
};