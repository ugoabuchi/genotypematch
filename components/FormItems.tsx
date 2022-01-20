import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { NameIcon, UsernameIcon, PasskeyIcon, RetryIcon, LoadIndicator, ValidIcon, ErrorIcon, PassKeyVisibleIcon, PassKeyInVisibleIcon } from "./Icon";
import { FormInputBoxType } from "../types";
import { nameValidator, usernameValidator, passkeyValidator } from "../helpers/Validators";
import * as Animatable from 'react-native-animatable';

export const NameInputBox = ({ theme, language, placeholder = null, defaultvalue = "", onEdit = () => { }, editable = true }: FormInputBoxType) => {
    const [inputValue, setInputValue] = useState<string>(defaultvalue);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [ErrorText, setErrorText] = useState<any>(null);
    useEffect(() => {
        validateName(inputValue);
    }, [inputValue]);

    const validateName = (input: string) => {
        setErrorText(null);
        setLoading(true);
        const result = nameValidator(language, input);
        if (result.response == "true") {
            onEdit(input.trim());
            setErrorText(null);
            setIsError(false);
            setLoading(false);
        }
        else {
            onEdit(null);
            setErrorText(result.responsetext);
            setIsError(true);
            setLoading(false);
        }
    }


    return (
        <>
            <View style={theme.FormItemsStyle.FormBox.container}>

                <View style={theme.FormItemsStyle.FormBox.leftIconContainer}>
                    <NameIcon theme={theme} />
                </View>

                <View style={theme.FormItemsStyle.FormBox.inputContainer}>
                    <TextInput editable={editable} numberOfLines={1} placeholder={placeholder == null ? language.GENERAL.NAMEPLACEHOLDER : placeholder} placeholderTextColor={theme.GenralComponentColors.COMPLIMENTARY1} value={inputValue} keyboardType="default" autoCompleteType="off" autoCapitalize="words" autoFocus={false} autoCorrect={false} onChangeText={(text) => setInputValue(text)} style={theme.FormItemsStyle.FormBox.TextInput} />
                </View>

                <View style={theme.FormItemsStyle.FormBox.rightIconContainer}>
                    {

                        (

                            loading == true

                                ?

                                <LoadIndicator theme={theme} />

                                :

                                (

                                    inputValue != ""

                                    &&

                                    (
                                        isError == false

                                            ?

                                            <ValidIcon theme={theme} />

                                            :

                                            <ErrorIcon theme={theme} />

                                    )

                                )

                        )

                    }
                </View>

            </View>
            {
                (

                    ErrorText != null && inputValue != "" && isError == true

                        ?

                        (

                            <Animatable.View animation='slideInRight' style={theme.FormItemsStyle.FormBox.ErrorBox}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={theme.FormItemsStyle.FormBox.ErrorText}>{ErrorText}</Text>
                            </Animatable.View>

                        )

                        :

                        (
                            loading == true

                            &&

                            (

                                <Animatable.View animation='slideInRight' style={theme.FormItemsStyle.FormBox.ErrorBox}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={theme.FormItemsStyle.FormBox.checkingText}>{language.GENERAL.RESPONSE.GENERAL.CHECKINGAVAILABILITY}</Text>
                                </Animatable.View>

                            )

                        )

                )

            }
        </>

    );

}


export const UsernameInputBox = ({ theme, language, useCase = "signup", placeholder = null, defaultvalue = "", onEdit = () => { }, editable = true }: FormInputBoxType) => {
    const [inputValue, setInputValue] = useState<string>(defaultvalue);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<(string | any)>("false");
    const [ErrorText, setErrorText] = useState<(any)>(null);
    useEffect(() => {
        validateUsername(inputValue);
    }, [inputValue]);

    const validateUsername = async (input: string) => {
        setErrorText(null);
        setLoading(true);
        const result = await usernameValidator(language, input, useCase);
        if (result.response == "true") {
            onEdit(input.trim());
            setErrorText(null);
            setIsError("false");
            setLoading(false);
        }
        else if (result.response == "false") {
            onEdit(null);
            setErrorText(result.responsetext);
            setIsError("true");
            setLoading(false);
        }
        else {
            onEdit(null);
            setErrorText(result.responsetext);
            setIsError(null);
            setLoading(false);
        }
    }


    return (
        <>
            <View style={theme.FormItemsStyle.FormBox.container}>

                <View style={theme.FormItemsStyle.FormBox.leftIconContainer}>
                    <UsernameIcon theme={theme} />
                </View>

                <View style={theme.FormItemsStyle.FormBox.inputContainer}>
                    <TextInput editable={editable} numberOfLines={1} placeholder={placeholder == null ? language.GENERAL.USERNAMEPLACEHOLDER : placeholder} placeholderTextColor={theme.GenralComponentColors.COMPLIMENTARY1} value={inputValue} keyboardType="default" autoCompleteType="off" autoCapitalize="none" autoFocus={false} autoCorrect={false} onChangeText={(text) => { setInputValue(text) }} style={theme.FormItemsStyle.FormBox.TextInput} />
                </View>

                <View style={theme.FormItemsStyle.FormBox.rightIconContainer}>
                    {

                        (

                            loading == true

                                ?

                                <LoadIndicator theme={theme} />

                                :

                                (

                                    inputValue != ""

                                    &&

                                    (
                                        isError == "false"

                                            ?

                                            <ValidIcon theme={theme} />

                                            :

                                            (
                                                isError == "true"

                                                    ?

                                                    <ErrorIcon theme={theme} />

                                                    :

                                                    (

                                                        isError == null
                                                        &&
                                                        <RetryIcon theme={theme} actionPressed={() => validateUsername(inputValue)} />
                                                    )

                                            )

                                    )


                                )

                        )

                    }
                </View>

            </View>
            {
                (
                    ErrorText != null && inputValue != "" && (isError == "true" || isError == null)
                        ?
                        (
                            <Animatable.View animation='slideInRight' style={theme.FormItemsStyle.FormBox.ErrorBox}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={theme.FormItemsStyle.FormBox.ErrorText}>{ErrorText}</Text>
                            </Animatable.View>
                        )
                        :
                        (
                            loading == true
                            &&
                            (
                                <Animatable.View animation='slideInRight' style={theme.FormItemsStyle.FormBox.ErrorBox}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={theme.FormItemsStyle.FormBox.checkingText}>{language.GENERAL.RESPONSE.GENERAL.CHECKINGAVAILABILITY}</Text>
                                </Animatable.View>
                            )

                        )
                )
            }
        </>

    );

}


export const PasskeyInputBox = ({ theme, language, placeholder = null, defaultvalue = "", onEdit = () => { }, editable = true }: FormInputBoxType) => {
    const [inputValue, setInputValue] = useState<string>(defaultvalue);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [ErrorText, setErrorText] = useState<any>(null);
    const [isSecure, setIsSecure] = useState<boolean>(true);
    useEffect(() => {
        validateUsername(inputValue);
    }, [inputValue]);

    const validateUsername = async (input: string) => {
        setErrorText(null);
        setLoading(true);
        const result = await passkeyValidator(language, input);
        if (result.response == "true") {
            onEdit(input.trim());
            setErrorText(null);
            setIsError(false);
            setLoading(false);
        }
        else {
            onEdit(null);
            setErrorText(result.responsetext);
            setIsError(true);
            setLoading(false);
        }
    }


    return (
        <>
            <View style={theme.FormItemsStyle.FormBox.container}>

                <View style={theme.FormItemsStyle.FormBox.leftIconContainer}>
                    <PasskeyIcon theme={theme} />
                </View>

                <View style={theme.FormItemsStyle.FormBox.inputContainer}>

                    <View style={theme.FormItemsStyle.FormBox.inputInnerDoubleContainer}>

                        <View style={theme.FormItemsStyle.FormBox.inputInnerDoubleContainerinputContainer}>
                            <TextInput editable={editable} numberOfLines={1} placeholder={placeholder == null ? language.GENERAL.PASSKEYPLACEHOLDER : placeholder} placeholderTextColor={theme.GenralComponentColors.COMPLIMENTARY1} value={inputValue} keyboardType="numeric" secureTextEntry={isSecure} autoCompleteType="off" autoCapitalize="none" autoFocus={false} autoCorrect={false} onChangeText={(text) => { setInputValue(text) }} style={theme.FormItemsStyle.FormBox.TextInput} />
                        </View>
                        <View style={theme.FormItemsStyle.FormBox.inputInnerDoubleContainerrightIconContainer}>
                            {
                                (
                                    inputValue != ""
                                    &&
                                    (
                                        isSecure == true
                                            ?
                                            <PassKeyInVisibleIcon theme={theme} actionPressed={() => setIsSecure(false)} />
                                            :
                                            <PassKeyVisibleIcon theme={theme} actionPressed={() => setIsSecure(true)} />
                                    )
                                )

                            }
                        </View>

                    </View>

                </View>

                <View style={theme.FormItemsStyle.FormBox.rightIconContainer}>
                    {

                        (

                            loading == true

                                ?

                                <LoadIndicator theme={theme} />

                                :

                                (

                                    inputValue != ""

                                    &&

                                    (
                                        isError == false

                                            ?

                                            <ValidIcon theme={theme} />

                                            :

                                            <ErrorIcon theme={theme} />

                                    )


                                )

                        )

                    }
                </View>

            </View>
            {
                (
                    ErrorText != null && inputValue != "" && isError == true
                        ?
                        (
                            <Animatable.View animation='slideInRight' style={theme.FormItemsStyle.FormBox.ErrorBox}>
                                <Text numberOfLines={1} adjustsFontSizeToFit style={theme.FormItemsStyle.FormBox.ErrorText}>{ErrorText}</Text>
                            </Animatable.View>
                        )
                        :
                        (
                            loading == true
                            &&
                            (
                                <Animatable.View animation='slideInRight' style={theme.FormItemsStyle.FormBox.ErrorBox}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit style={theme.FormItemsStyle.FormBox.checkingText}>{language.GENERAL.RESPONSE.GENERAL.CHECKINGAVAILABILITY}</Text>
                                </Animatable.View>
                            )

                        )
                )
            }
        </>

    );

}