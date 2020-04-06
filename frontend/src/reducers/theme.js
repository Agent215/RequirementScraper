import {TOGGLE_DARK, SET_THEME} from "../actions/types";

export const Themes = {
    Cherry: "cherry",
    Contrast: "contrast"
};

const initialState = {
    primary: Themes.Cherry,
    dark: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            return Object.assign({}, state, { primary: action.theme });
        case TOGGLE_DARK:
            return Object.assign({}, state, { dark: !state.dark });
        default:
            return state;
    }
};