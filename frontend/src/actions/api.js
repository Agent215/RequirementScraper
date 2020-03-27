import {ACCESS_DENIED, API, API_END, API_ERROR, API_START} from "./types";

export const fetchAction = ({
    url = "",
    method = "GET",
    data = null,
    accessToken = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = "",
    headersOverride = null
}) => ({
    type: API,
    payload: {
        url,
        method,
        data,
        accessToken,
        onSuccess,
        onFailure,
        label,
        headersOverride
    }
});

export const apiStart = payload => ({ type: API_START, payload });
export const apiEnd = payload => ({ type: API_END, payload });
export const apiError = error => ({ type: API_ERROR, error });
export const accessDenied = url => ({ type: ACCESS_DENIED, payload: { url } });