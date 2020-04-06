import {TOGGLE_DARK, SET_THEME} from "./types";

export const setTheme = (theme) => ({ type: SET_THEME, theme });
export const toggleDark = () => ({ type: TOGGLE_DARK });