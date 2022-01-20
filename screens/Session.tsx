import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  BackHandler
} from 'react-native';
import { LogoWTBIcon } from '../components/logo';
import { MainButton } from '../components/Button';
import StatusBar from '../components/Statusbar';
import {
  changeGeneralSession,
  changeProfileSession,
  changeLoginSession
} from '../redux/actions/Session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isLoggedIn } from '../components/common';
import { AlertBoxStateParamType, NavPropsType } from '../types';
import { MyAlert } from '../components/PopUp';

const Session = ({ navigation, route, login_session, profile_session, general_session, login_session_action, profile_session_action, general_session_action }: NavPropsType) => {
  const [alertBox, setAlertBox] = useState<AlertBoxStateParamType>({
    alertType: "normal",
    showAlert: false,
    title: null,
    message: null,
    cancelText: null,
    cancelAction: () => { },
    showConfirm: true,
    confirmText: null,
    confirmAction: () => { }
  });
  const Theme = general_session.general_session.theme_mode;
  const Lang = general_session.general_session.Language;


  useEffect(() => {

    //BackHandlerCallBack
    BackHandler.addEventListener("hardwareBackPress", () => {
      setAlertBox({
        ...alertBox,
        alertType: "warning",
        message: Lang.GENERAL.EXITAPP,
        cancelText: Lang.GENERAL.NO,
        confirmText: Lang.GENERAL.YES,
        showConfirm: true,
        showAlert: true,
        cancelAction: () => setAlertBox({ ...alertBox, showAlert: false }),
        confirmAction: () => BackHandler.exitApp()
      });
      return true;
    })


  }, [])

  isLoggedIn({
    login_session: login_session,
    mandate: true,
    yourCallBack: () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
      navigation.replace('Main', {
        screen: 'AfterLogin',
        params: {
          screen: 'Encounter',
          params: { toast: undefined }
        }
      })

    }
  });




  const onMainBTNAction = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => true);
    navigation.replace("GMLogin");
  }


  return (
    <>
      <View style={Theme.SessionStyle.container}>

        <View style={Theme.SessionStyle.top}>

          <View style={Theme.SessionStyle.topChildContainer}>

            <View style={Theme.SessionStyle.imageViewBox}>
              <LogoWTBIcon />
            </View>

          </View>

        </View>

        <View style={Theme.SessionStyle.bottom}>

          <View style={Theme.SessionStyle.bottomChildContainer}>

            <View style={Theme.SessionStyle.bottomTextView}>

              <Text numberOfLines={2} adjustsFontSizeToFit style={Theme.SessionStyle.bottomMainText}>{Lang.SESSION_SCREEN.MAIN_TEXT}</Text>


            </View>

            <View style={Theme.SessionStyle.bottomMainButtonView}>

              <MainButton theme={Theme} language={Lang} title={Lang.SESSION_SCREEN.BUTTON_TEXT} onAction={() => onMainBTNAction()} />


            </View>

          </View>

        </View>


      </View>

      <MyAlert
        theme={Theme}
        language={Lang}
        alertType={alertBox.alertType}
        title={alertBox.title}
        message={alertBox.message}
        cancelText={alertBox.cancelText}
        cancelAction={() => alertBox.cancelAction()}
        confirmText={alertBox.confirmText}
        showConfirm={alertBox.showConfirm}
        confirmAction={() => alertBox.confirmAction()}
        showAlert={alertBox.showAlert}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  login_session: state.login_session,
  profile_session: state.profile_session,
  general_session: state.general_session,
});

const mapDispatchToProps = (dispatch: any) => ({
  login_session_action: bindActionCreators(changeLoginSession, dispatch),
  profile_session_action: bindActionCreators(changeProfileSession, dispatch),
  general_session_action: bindActionCreators(changeGeneralSession, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
