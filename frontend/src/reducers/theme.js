import {SET_THEME} from "../actions/types";

export const Themes = {
    Cherry: "cherry",
    Contrast: "contrast"
};

export default (state = Themes.Cherry, action) => {
    switch (action.type) {
        case SET_THEME:
            return action.theme;
        default:
            return state;
    }
};