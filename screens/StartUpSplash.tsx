import React, { useEffect, useState } from 'react';
import {
  View,
  Text
} from 'react-native';
import StatusBar from '../components/Statusbar';
import {
  changeGeneralSession,
  changeProfileSession,
  changeLoginSession
} from '../redux/actions/Session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isLoggedIn } from '../components/common';
import { NavPropsType } from '../types';
import { SampleUsersImage } from '../components/logo';
import { PrimaryLoadingIndicator } from '../components/Icon';
import { SPLASH_SCREEN_TIMEOUT } from '../constants/constants';
import { StartUpHeaderConfiguration } from '../components/common';

const StartUpSplash = ({ navigation, route, login_session, profile_session, general_session, login_session_action, profile_session_action, general_session_action }: NavPropsType) => {

  const [shouldLogIn, setShouldLogIn] = useState<boolean>(false);

  const Theme = general_session.general_session.theme_mode;
  const Lang = general_session.general_session.Language;


  StartUpHeaderConfiguration({
    login_session: login_session,
    profile_session: profile_session,
    general_session: general_session,
    login_session_action: login_session_action,
    profile_session_action: profile_session_action,
    general_session_action: general_session_action,
    backScreenDispatch: () => () => {
      //noaction
    },
    setTimer: SPLASH_SCREEN_TIMEOUT,
    yourCallBack: () => {
      setShouldLogIn(true);
    }
  });

  isLoggedIn({
    login_session: login_session,
    mandate: true,
    yourCallBack: () => {
      setTimeout(() => {

        navigation.replace('Main', {
          screen: 'AfterLogin'
        })
        clearTimeout();
      }, SPLASH_SCREEN_TIMEOUT * 1000)

    }
  });

  useEffect(() => {
    if (shouldLogIn == true && login_session.login_session == false) {
      setTimeout(() => {
        navigation.replace('Session');
        clearTimeout();
      }, SPLASH_SCREEN_TIMEOUT * 1000);
    }
  }, [shouldLogIn])




  return (
    <>
      <View style={Theme.StartUpScreenStyle.container}>
        <View style={Theme.StartUpScreenStyle.imageViewBox}>
          <SampleUsersImage />
        </View>
        <View style={Theme.StartUpScreenStyle.loaderViewBox}>
          <PrimaryLoadingIndicator theme={Theme} />
          <Text numberOfLines={1} adjustsFontSizeToFit style={Theme.StartUpScreenStyle.text}>{Lang.STARTUP_SCREEN.LOADING_CONFIGURATION}</Text>
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(StartUpSplash);
