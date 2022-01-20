import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PrimaryLoadingIndicator, ButtonContinueIcon } from "./Icon";
import { MainButtonTtype } from "../types";


const MainButton = ({ theme, language, title = undefined, onAction = () => { }, isWithLoader = { isLoader: false, onLoadingText: undefined, showLoader: false } }: MainButtonTtype) => {

    const Lang = language.GENERAL;

    const NoLoader = () => {

        return (
            <TouchableOpacity onPress={() => { onAction() }}>
                <View style={theme.MainButtonDefaultStyle.touchableOpacity}>

                    <View style={theme.MainButtonDefaultStyle.buttonLeftViewBox}>

                        <Text numberOfLines={1} adjustsFontSizeToFit style={theme.MainButtonDefaultStyle.buttonLeftText}>{title == null ? Lang.DEFAULT_BUTTON_TEXT : title}</Text>

                    </View>
                    <View style={theme.MainButtonDefaultStyle.buttonRightViewBox}>
                        <ButtonContinueIcon theme={theme} />
                    </View>

                </View>
            </TouchableOpacity>
        );
    }


    const YesLoader = () => {

        return (

            <TouchableOpacity disabled={isWithLoader.showLoader} onPress={() => { onAction() }}>
                <View style={theme.MainButtonDefaultStyle.touchableOpacity}>

                    <View style={theme.MainButtonDefaultStyle.buttonLeftViewBox}>

                        <Text numberOfLines={1} adjustsFontSizeToFit style={theme.MainButtonDefaultStyle.buttonLeftText}>{isWithLoader.showLoader == false ? (title == null ? Lang.DEFAULT_BUTTON_TEXT : title) : (isWithLoader.onLoadingText == null ? Lang.DEFAULT_BUTTON_LOAD_TEXT : isWithLoader.onLoadingText)}</Text>

                    </View>
                    <View style={theme.MainButtonDefaultStyle.buttonRightViewBox}>
                        {
                            isWithLoader.showLoader == true
                                ?
                                <PrimaryLoadingIndicator theme={theme} />
                                :
                                <ButtonContinueIcon theme={theme} />
                        }
                    </View>

                </View>
            </TouchableOpacity>
        );
    }


    return (


        isWithLoader.isLoader == true
            ?

            <YesLoader />

            :

            <NoLoader />




    );

}

const SubButton = ({ theme, language, title = undefined, onAction = () => { }, isWithLoader = { isLoader: false, onLoadingText: undefined, showLoader: false } }: MainButtonTtype) => {

    const Lang = language.GENERAL;

    const NoLoader = () => {

        return (
            <TouchableOpacity onPress={() => { onAction() }}>
                <View style={theme.MainButtonDefaultStyle.secondaryTouchableOpacity}>

                    <View style={theme.MainButtonDefaultStyle.buttonLeftViewBox}>

                        <Text numberOfLines={1} adjustsFontSizeToFit style={theme.MainButtonDefaultStyle.buttonLeftText}>{title == null ? Lang.DEFAULT_BUTTON_TEXT : title}</Text>

                    </View>
                    <View style={theme.MainButtonDefaultStyle.buttonRightViewBox}>
                        <ButtonContinueIcon theme={theme} />
                    </View>

                </View>
            </TouchableOpacity>
        );
    }


    const YesLoader = () => {

        return (

            <TouchableOpacity disabled={isWithLoader.showLoader} onPress={() => { onAction() }}>
                <View style={theme.MainButtonDefaultStyle.secondaryTouchableOpacity}>

                    <View style={theme.MainButtonDefaultStyle.buttonLeftViewBox}>

                        <Text numberOfLines={1} adjustsFontSizeToFit style={theme.MainButtonDefaultStyle.buttonLeftText}>{isWithLoader.showLoader == false ? (title == null ? Lang.DEFAULT_BUTTON_TEXT : title) : (isWithLoader.onLoadingText == null ? Lang.DEFAULT_BUTTON_LOAD_TEXT : isWithLoader.onLoadingText)}</Text>

                    </View>
                    <View style={theme.MainButtonDefaultStyle.buttonRightViewBox}>
                        {
                            isWithLoader.showLoader == true
                                ?
                                <PrimaryLoadingIndicator theme={theme} />
                                :
                                <ButtonContinueIcon theme={theme} />
                        }
                    </View>

                </View>
            </TouchableOpacity>
        );
    }


    return (


        isWithLoader.isLoader == true
            ?

            <YesLoader />

            :

            <NoLoader />




    );

}

export { MainButton, SubButton };
