import React from "react"
import { Modal } from "react-native-paper"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { ModalPopUp } from "../types"

export const ModalPopUpBox = ({theme, language, title = null, showModal = false, content, showConfirm = false, confirmText = null, confirmAction = ()=>{}, closeAction} : ModalPopUp) => {

    return <Modal
    visible ={showModal}

    dismissable = {false}

    style={theme.Modal.General.rootContainer}
    children={
      <View style={theme.Modal.PopUp.contentContainer}>


        {/* Header */}
        <View style={theme.Modal.PopUp.header}>

          <View style={theme.Modal.PopUp.headerChild1}>

        <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.Modal.PopUp.headerChild1Text}>{title == null || title == "" ? language.GENERAL.DEFAULT_MODAL_TITLE : title}</Text>
          </View>


            {/* Fetch Button */}
          <TouchableOpacity style={[theme.Modal.PopUp.headerChild2, {display: showConfirm == true ? "flex" : "none"}]}
          
          onPress={() => confirmAction()}
          >
             <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.Modal.PopUp.headerChild2Text}>{confirmText == null ? language.GENERAL.DEFAULT_MODAL_CORNFIRM_TEXT : confirmText}</Text>

          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={theme.Modal.PopUp.headerChild3}
          
          onPress={() => closeAction()}
          >

        <Text numberOfLines={1} adjustsFontSizeToFit={true} style={theme.Modal.PopUp.headerChild3Text}>{language.GENERAL.DEFAULT_MODAL_CLOSE_TEXT}</Text>
          </TouchableOpacity>
        </View>


        {/* Body */}
        <View style={theme.Modal.PopUp.body}>
          <ScrollView>
            {content}
          </ScrollView>
        </View>

      </View>
    }
    />
}