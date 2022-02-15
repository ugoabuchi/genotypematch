import { ActionT } from "../../types";
import { LOGIN_SESSION_CHANGE, PROFILE_SESSION_CHANGE, GENERAL_SESSION_CHANGE } from "../constants/Session";
import { ENGLISH } from "../../constants/language";
import { LightMode, DarkMode } from "../../components/styles";
import { getBearer } from "../../components/common";

const initialState = {
        login_session: false
    }

const initialStateofProfile =  {
        profile_session: {},
        settings: {}
    }

const initialStateofGeneral =  {
    general_session: {
        initialAppLoad: true,
        prevLoginUser: "",
        FirstTimeAppLogin: true,
        Language: ENGLISH,
        lastLogError: "",
        theme_mode: LightMode,
        storeLocalData: false,
        bearer: getBearer(),
        settings: {
            statusBar: false,
            fingerprint: false,
            notification: {
                background: true,
                style : "slide",
                messages: true,
                likes: true,
                gifts: true,
                profile: true,
                upgrades: true,
                payments: true,
                general: true,
            }
        }
    }
}


const loginSessionReducer = (state = initialState, action : ActionT) => {
    switch(action.type) {
    case LOGIN_SESSION_CHANGE:
    return {
    ...state,
    login_session:action.payload
    };
    default:
    return state;
    }
}

const profileSessionReducer = (state = initialStateofProfile, action: ActionT) => {
    switch(action.type) {
    case PROFILE_SESSION_CHANGE:
    return {
    ...state,
    profile_session:action.payload
    };
    default:
    return state;
    }
}

const generalSessionReducer = (state = initialStateofGeneral, action: ActionT) => {
    switch(action.type) {
    case GENERAL_SESSION_CHANGE:
    return {
    ...state,
    general_session:action.payload
    };
    default:
    return state;
    }
}


export {generalSessionReducer, loginSessionReducer, profileSessionReducer}