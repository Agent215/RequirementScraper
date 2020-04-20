import {SET_THEME, TOGGLE_DARK} from "./types";

export const setTheme = (theme) => ({ type: SET_THEME, theme });
export const toggleDark = () => ({ type: TOGGLE_DARK });