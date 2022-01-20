import { ReduxSession, storeLocalyType } from "../../types";
import { LOGIN_SESSION_CHANGE, PROFILE_SESSION_CHANGE, GENERAL_SESSION_CHANGE } from "../constants/Session";
import { storeLocally } from "../../components/common";
const changeLoginSession = (session : ReduxSession, localStoreSettings: storeLocalyType) => {

    //call localStore to take neccessary actions before submittion global state or dispatching
    //Also no need to await, as we not be getting a response from the function "storeLocally"
    storeLocally(session, localStoreSettings);

    //continue redux process
    return {
        type: LOGIN_SESSION_CHANGE,
        payload: session
    }

}

const changeProfileSession = (session : ReduxSession, localStoreSettings: storeLocalyType) => {

    //call localStore to take neccessary actions before submittion global state or dispatching
    //Also no need to await, as we not be getting a response from the function "storeLocally"
    storeLocally(session, localStoreSettings);

    //continue redux process
    return {
        type: PROFILE_SESSION_CHANGE,
        payload: session
    }
    
}

const changeGeneralSession = (session : ReduxSession, localStoreSettings: storeLocalyType) => {

    //call localStore to take neccessary actions before submittion global state or dispatching
    //Also no need to await, as we not be getting a response from the function "storeLocally"
    storeLocally(session, localStoreSettings);

    //continue redux process
    return {
        type: GENERAL_SESSION_CHANGE,
        payload: session
    }
    
}


export {changeGeneralSession, changeLoginSession, changeProfileSession}