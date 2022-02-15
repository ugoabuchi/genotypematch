import React, { useEffect, useState } from "react";
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { AlertBoxParamType, ModalViewTPopUp, MyModalType, MyModalViewType, ToastBoxParamType } from "../types";
import { SuccessAlertIcon, ErrorAlertIcon, WarningAlertIcon, NormalAlertIcon } from "./Icon";
import { PulseViewAnimation, SlideInFromRightViewAnimation } from "./Animations";


export const PopUp = ({ theme, showAlert = false, customView }: MyModalType) => {

  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      customView={customView}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={false}
      alertContainerStyle={theme.PopUpStyle.container}
      contentContainerStyle={theme.PopUpStyle.contentContainer}
      contentStyle={theme.PopUpStyle.content}
      actionContainerStyle={theme.PopUpStyle.actionContainer}
      modalProps={
        {
          statusBarTranslucent: true,
          transparent: true,
          
        }
      }
      

    />
  );

}

export const ModalPopUpBox = ({ theme, language, title, showModal = false, content, confirmText = null, confirmAction = null, closeAction }: MyModalViewType) => {

  return (
    <AwesomeAlert
      show={showModal}
      showProgress={false}
      customView={<ModalContentView theme={theme} language={language} title={title} content={content} confirmText={confirmText} confirmAction={()=>confirmAction()} closeAction={()=>closeAction()}/>}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      showConfirmButton={false}
      alertContainerStyle={theme.PopUpStyle.container}
      contentContainerStyle={theme.PopUpStyle.contentContainer}
      contentStyle={theme.PopUpStyle.content}
      actionContainerStyle={theme.PopUpStyle.actionContainer}
      modalProps={
        {
          statusBarTranslucent: true,
          transparent: true,
        }
      }
      

    />
  );

}

const ModalContentView = ({theme, language, title, content, confirmText, confirmAction, closeAction} : ModalViewTPopUp) : JSX.Element => {

  return (
    <View style={theme.MyModalStyle.GENERAL.container}>

        <View style={theme.MyModalStyle.GENERAL.header}>
          <View style={confirmAction == null ? theme.MyModalStyle.GENERAL.headerTextBox : theme.MyModalStyle.GENERAL.headerTextBox1}>
            <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.MyModalStyle.GENERAL.headerText}>{title == null || title == "" ? language.GENERAL.DEFAULT_MODAL_TITLE : title}</Text>
          </View>

          {
            confirmAction != null
            &&
            <TouchableOpacity onPress={() => confirmAction()} style={theme.MyModalStyle.GENERAL.headerConfirmBox}>
              <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.MyModalStyle.GENERAL.headerConfirmText}>{confirmText == null ? language.GENERAL.DEFAULT_MODAL_CORNFIRM_TEXT : confirmText}</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity onPress={() => closeAction()} style={theme.MyModalStyle.GENERAL.headerCloseBox}>
            <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.MyModalStyle.GENERAL.headerCloseText}>{language.GENERAL.DEFAULT_MODAL_CLOSE_TEXT}</Text>
          </TouchableOpacity>
        </View>

        <View style={theme.MyModalStyle.GENERAL.containerBody}>
          <ScrollView>
            {content}
          </ScrollView>
        </View>

      </View>
  )
}

export const MyAlert = ({ theme, language, alertType, showAlert, title, message, cancelText, cancelAction, showConfirm = false, confirmText = null, confirmAction = () => { } }: AlertBoxParamType) => {

  return (

    <PopUp theme={theme} showAlert={showAlert} customView={(
      <View style={theme.MyAlertStyle.GENERAL.container}>

        <View style={theme.MyAlertStyle.GENERAL.header}>
          <View style={theme.MyAlertStyle.GENERAL.headerTextBox}>
            <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.MyAlertStyle.GENERAL.headerText}>{title == null || title == "" ? (alertType == "error" ? language.GENERAL.DEFAULT_ERROR_ALERT_TITLE : (alertType == "success" ? language.GENERAL.DEFAULT_SUCCESS_ALERT_TITLE : (alertType == "warning" ? language.GENERAL.DEFAULT_WARNING_ALERT_TITLE : language.GENERAL.DEFAULT_NORMAL_ALERT_TITLE))) : title}</Text>
          </View>
          <View style={theme.MyAlertStyle.GENERAL.headerIconBox}>
            <PulseViewAnimation propData={alertType == "error" ? <ErrorAlertIcon theme={theme} /> : (alertType == "success" ? <SuccessAlertIcon theme={theme} /> : (alertType == "warning" ? <WarningAlertIcon theme={theme} /> : <NormalAlertIcon theme={theme} />))} />
          </View>
        </View>

        <View style={theme.MyAlertStyle.GENERAL.containerBody}>
          <Text style={theme.MyAlertStyle.GENERAL.contentText}>{message == null || message == "" ? language.GENERAL.DEFAULT_ALERT_MESSAGE : message}</Text>
        </View>
        <View style={theme.MyAlertStyle.GENERAL.containerFooter}>
          <TouchableOpacity style={showConfirm != false ? (alertType == "error" ? theme.MyAlertStyle.GENERAL.ErrorcancelTextBoxhalf : (alertType == "success" ? theme.MyAlertStyle.GENERAL.SuccesscancelTextBoxhalf : alertType == "warning" ? theme.MyAlertStyle.GENERAL.WarningcancelTextBoxhalf : theme.MyAlertStyle.GENERAL.NormalcancelTextBoxhalf)) : (alertType == "error" ? theme.MyAlertStyle.GENERAL.ErrorcancelTextBox : (alertType == "success" ? theme.MyAlertStyle.GENERAL.SuccesscancelTextBox : alertType == "warning" ? theme.MyAlertStyle.GENERAL.WarningcancelTextBox : theme.MyAlertStyle.GENERAL.NormalcancelTextBox))} onPress={() => cancelAction()}>

            <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.MyAlertStyle.GENERAL.cancelText} >{cancelText == null || cancelText == "" ? language.GENERAL.DEFAULT_ALERT_CANCEL_TEXT : cancelText}</Text>

          </TouchableOpacity>
          {
            (
              showConfirm == true
              &&
              <TouchableOpacity style={theme.MyAlertStyle.GENERAL.confirmTextBox} onPress={() => confirmAction()}>

                <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.MyAlertStyle.GENERAL.confirmText} >{confirmText == null || confirmText == "" ? language.GENERAL.DEFAULT_ALERT_CONFIRM_TEXT : confirmText}</Text>

              </TouchableOpacity>
            )
          }
        </View>

      </View>
    )} />

  );

}





export const MyToast = ({ theme, language, toastType = "normal", message = null, showToast = false, closeToastAction }: ToastBoxParamType) => {

  return (

    showToast == true
    &&
    <SlideInFromRightViewAnimation viewStyle={toastType == 'error' ? theme.MyToast.GENERAL.containerError : (toastType == "warning" ? theme.MyToast.GENERAL.containerWarning : (toastType == "success" ? theme.MyToast.GENERAL.containerSuccess : theme.MyToast.GENERAL.containerNormal))}
      propData=
      {
        (
          <View style={theme.MyToast.GENERAL.messageBox}>
            <Text numberOfLines={1} style={theme.MyToast.GENERAL.messageText}>{message == null || message == "" ? language.GENERAL.DEFAULT_TOAST_TEXT : message}</Text>
          </View>
        )
      } />

  );

}
