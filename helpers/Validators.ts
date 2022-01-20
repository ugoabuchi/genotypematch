import { getUsernameExist } from "../components/axios";
import { ValidatorResponse, useCaseForSession } from "../types";
import { APP_RESPONSE } from "../constants/constants";

export const nameValidator = (language: any, text: string): ValidatorResponse => {
    const name = (text.trim()).split(" ");
    const nameRegex = /^([\w]{3,})+\s+([\w]{3,})+$/

    if (name.length == 2) {
        if (name[0] != "" && name[0] != " " && name[1] != "" && name[1] != " " && name[0] != null && name[1] != null) {

            //check input with regex
            if (nameRegex.test((text.trim()))) {
                return {
                    response: "true"
                }
            }
            else {
                return {
                    response: "false",
                    responsetext: language.GENERAL.NAMEERRORTEXT.ONE
                }
            }


        }
        else {
            return {
                response: "false",
                responsetext: language.GENERAL.NAMEERRORTEXT.TWO

            }
        }
    }
    else {
        return {
            response: "false",
            responsetext: language.GENERAL.NAMEERRORTEXT.THREE
        }
    }

}

export const usernameValidator = async (language, text: string, useCase: useCaseForSession): Promise<ValidatorResponse> => {
    const usernamename = (text.trim()).toLowerCase();
    const usernamenameRegex = /^[a-z][\w\d]{3,18}\w$/

    if (usernamename.length > 4 && usernamename.length < 21) {
        if (usernamename != "" && usernamename != " " && usernamename != null) {

            //check input with regex
            if (usernamenameRegex.test(usernamename)) {
                //check if username exist from server API
                const params = new URLSearchParams();
                params.append('userid', usernamename);
                const APP_REQUEST_API = await getUsernameExist(params, language, useCase);

                if (APP_REQUEST_API.response == APP_RESPONSE.GENERAL.USERNAMEAVAILABLE) {
                    return {
                        response: "true",
                        responsetext: APP_REQUEST_API.message
                    }
                }
                else if (APP_REQUEST_API.response == APP_RESPONSE.GENERAL.USERNAMENOTAVAILABLE) {
                    return {
                        response: "false",
                        responsetext: APP_REQUEST_API.message
                    }
                }
                else {
                    return {
                        response: null,
                        responsetext: APP_REQUEST_API.message
                    }
                }
            }
            else {
                return {
                    response: "false",
                    responsetext: language.GENERAL.USERNAMEERRORTEXT.TWO
                }
            }


        }
        else {
            return {
                response: "false",
                responsetext: language.GENERAL.USERNAMEERRORTEXT.THREE

            }
        }
    }
    else {
        return {
            response: "false",
            responsetext: language.GENERAL.USERNAMEERRORTEXT.FOUR
        }
    }
}


export const passkeyValidator = (language, text: string): ValidatorResponse => {
    const passkey = text.trim();
    const passkeyRegex = /^[1-9]{6}$/

    if (passkey != null && passkey != "") {


        //check input with regex
        if (passkeyRegex.test((passkey))) {
            return {
                response: "true"
            }
        }
        else {
            return {
                response: "false",
                responsetext: language.GENERAL.PASSKEYERRORTEXT.TWO
            }
        }



    }
    else {
        return {
            response: "false",
            responsetext: language.GENERAL.PASSKEYERRORTEXT.ONE
        }
    }
}