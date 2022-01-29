import React, { useEffect } from 'react';
import {
  BackHandler,
  View
} from 'react-native';
import StatusBar from '../components/Statusbar';
import { connect } from 'react-redux';
import { NavPropsType } from '../types';
import { LogoWTIcon } from '../components/logo';
import { SPLASH_SCREEN_TIMEOUT } from '../constants/constants';

const SplashScreen = ({ navigation, general_session }: NavPropsType) => {
  useEffect(() => {



    BackHandler.addEventListener("hardwareBackPress", () => {
      //no action
      return true;
    });

    setTimeout(() => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
      navigation.replace('StartUpSplash');
      clearTimeout();
    }, SPLASH_SCREEN_TIMEOUT * 1000)

  }, [])


  const Theme = general_session.general_session.theme_mode;
  return (
    <>
    <StatusBar theme={Theme} />
      <View style={Theme.SplashScreenStyle.container}>
        <View style={Theme.SplashScreenStyle.imageViewBox}>
          <LogoWTIcon />
        </View>
      </View>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  general_session: state.general_session
});


export default connect(mapStateToProps)(SplashScreen);
