import React, { useEffect, useRef } from 'react';
import {
  BackHandler,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { NavPropsType } from '../types';
import { LogoWTIcon } from '../components/logo';
import { SPLASH_SCREEN_TIMEOUT } from '../constants/constants';
import StatusBar from '../components/Statusbar';

const SplashScreen = ({ navigation, general_session }: NavPropsType) => {

  const backHandlerListener = useRef<any>();
  const timerHandlerListener = useRef<any>();

  useEffect(() => {



    backHandlerListener.current = BackHandler.addEventListener("hardwareBackPress", () => {
      //no action
      return true;
    });

   timerHandlerListener.current = setTimeout(() => {
      navigation.replace('StartUpSplash');
    }, SPLASH_SCREEN_TIMEOUT * 1000)

    return () => {
      clearTimeout(timerHandlerListener.current);
      BackHandler.removeEventListener('hardwareBackPress', backHandlerListener.current);
    };
  }, [])


  const Theme = general_session.general_session.theme_mode;
  return (
    <>
    <StatusBar/>
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
