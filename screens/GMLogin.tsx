import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  BackHandler
} from 'react-native';
import { LogoWTIcon } from '../components/logo';
import { UsernameInputBox, PasskeyInputBox } from '../components/FormItems';
import { MainButton } from '../components/Button';
import { MyAlert } from '../components/PopUp';
import { LoginParamStateType, buttonParamType, AlertBoxStateParamType, NavPropsType } from '../types';
import {
  changeLoginSession,
  changeProfileSession,
  changeGeneralSession
} from '../redux/actions/Session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../components/axios';
import { APP_RESPONSE, REDUX_SESSION_LOCAL_STORE_KEYS } from '../constants/constants';
import { isLoggedIn } from '../components/common';
import StatusBar from '../components/Statusbar';




const GMLogin = ({ navigation, route, login_session, profile_session, general_session, login_session_action, profile_session_action, general_session_action }: NavPropsType) => {
  
  //create notification pushtoken states
  const backHandlerListener = useRef<any>();
  

  //set other states  
  const [data, setData] = useState<LoginParamStateType>({
    username: null,
    password: null,
    editable: true
  });
  const [singinButton, setSignButton] = useState<buttonParamType>({
    isLoader: true,
    showLoader: false
  })
  const [alertBox, setAlertBox] = useState<AlertBoxStateParamType>({
    alertType: "normal",
    showAlert: false,
    title: null,
    message: null,
    cancelText: null,
    cancelAction: () => { },
    showConfirm: false,
    confirmText: null,
    confirmAction: () => { }
  });
  const Theme = general_session.general_session.theme_mode;
  const Lang = general_session.general_session.Language;

  useEffect(() => {

    //First time quering for back handler
    backHandlerListener.current =  BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
      navigation.navigate("Session");
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandlerListener.current);
    };

  }, [])

  isLoggedIn({
    login_session: login_session,
    mandate: true,
    yourCallBack: () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandlerListener.current);
      navigation.navigate('Main', {
        screen: 'AfterLogin'
      });
    }
  });



  const cancelAlert = () => {
    setAlertBox({
      ...alertBox,
      showAlert: false
    });
  }
  const retryLogin = () => loginAction();

  const username = (input: string) => {
    setData({
      ...data,
      username: input
    });
  }

  const password = (input: string) => {
    setData({
      ...data,
      password: input
    });
  }

  const loginAction = async () => {

    setAlertBox({
      ...alertBox,
      showAlert: false
    });

      //lock entry fields
      setData({
        ...data,
        editable: false
      })
      //disable signin button
      setSignButton({
        ...singinButton,
        showLoader: true
      });

    try{

   //reload exponent push notificatoin token and on the server end must be request on every login which should always be updated in the backend
  const { status } = await Notifications.getPermissionsAsync().catch((err) => {throw "EPKERR 1"});
  let finalStatus = status;

  if (status !== 'granted') {

    const { status } = await Notifications.requestPermissionsAsync().catch((err) => {throw "EPKERR 2"});
    finalStatus = status;

  }

  if (finalStatus !== 'granted') {

    setData({
      ...data,
      editable: true
    })
    //disable signin button
    setSignButton({
      ...singinButton,
      showLoader: false
    });
    setAlertBox({
      ...alertBox,
      alertType: 'error',
      cancelAction: () => cancelAlert(),
      message: Lang.GENERAL.PUSHNOTIFICATIONTOKENERROR,
      showConfirm: false,
      showAlert: true
    })

  }
  else
  {

    const exponentpushnotificationtoken = await Notifications.getExpoPushTokenAsync().then((value) => value.data).catch((err) => {throw "EPKERR 3"});

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    
    //Lets perform login operation  now
    if (data.username != null && data.password != null) {


      //send to API Server
      const params = new URLSearchParams();
      params.append('userid', data.username);
      params.append('password', data.password);
      params.append('PNID', exponentpushnotificationtoken);
      const APP_REQUEST_API = await loginUser(params, Lang);

      if (APP_REQUEST_API.response == APP_RESPONSE.LOGIN.SUCCESS) {
        //update user general configs
        if (general_session.general_session.FirstTimeAppLogin == true) {
          general_session_action(
            {
              ...general_session.general_session,
              FirstTimeAppLogin: false,
              prevLoginUser: (APP_REQUEST_API.data.name).split(" ")[1]
            },
            {
              allow: general_session.general_session.storeLocalData,
              key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
            }
          );
        }
        else {
          general_session_action(
            {
              ...general_session.general_session,
              prevLoginUser: (APP_REQUEST_API.data.name).split(" ")[1]
            },
            {
              allow: general_session.general_session.storeLocalData,
              key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
            }
          );
        }



        //update profile state
        profile_session_action(
          APP_REQUEST_API.data,
          {
            allow: general_session.general_session.storeLocalData,
            key: REDUX_SESSION_LOCAL_STORE_KEYS.profile_session
          }
        );

        //unlock entry fields
        setData({
          ...data,
          editable: true
        })
        //disable signin button
        setSignButton({
          ...singinButton,
          showLoader: false
        });

        //Inapp user logged-in mode
        login_session_action(
          true,
          {
            allow: general_session.general_session.storeLocalData,
            key: REDUX_SESSION_LOCAL_STORE_KEYS.login_session
          }
        )

        //unlock entry fields
        setData({
          ...data,
          editable: true
        })
        //disable signin button
        setSignButton({
          ...singinButton,
          showLoader: false
        });
      }
      else {
        //couldn't login
        //unlock entry fields
        setData({
          ...data,
          editable: true
        })
        //disable signin button
        setSignButton({
          ...singinButton,
          showLoader: false
        });

        setAlertBox({
          ...alertBox,
          alertType: 'error',
          confirmText: Lang.GENERAL.ALERT_RETRY_TEXT,
          confirmAction: () => retryLogin(),
          cancelAction: () => cancelAlert(),
          message: APP_REQUEST_API.message,
          showConfirm: true,
          showAlert: true
        })

      }


    }
    else {
      //couldn't login - Empty Fields
        //unlock entry fields
        setData({
          ...data,
          editable: true
        })
        //disable signin button
        setSignButton({
          ...singinButton,
          showLoader: false
        });
      setAlertBox({
        ...alertBox,
        alertType: 'error',
        showConfirm: false,
        cancelAction: () => cancelAlert(),
        message: Lang.GENERAL.EMPTY_FORM_FIELD_DETECTED,
        showAlert: true
      })
    }

    
  }
    }
    catch(err){
      
      setData({
        ...data,
        editable: true
      })
      //disable signin button
      setSignButton({
        ...singinButton,
        showLoader: false
      });
      setAlertBox({
        ...alertBox,
        alertType: 'error',
        cancelAction: () => cancelAlert(),
        message: Lang.GENERAL.PUSHNOTIFICATIONTOKENERROR,
        showConfirm: false,
        showAlert: true
      })


    }

    

  

    //check 1 - null entries
   /* if (data.username != null && data.password != null) {
      //lock entry fields
      setData({
        ...data,
        editable: false
      })
      //disable signin button
      setSignButton({
        ...singinButton,
        showLoader: true
      });

      //send to API Server
      const params = new URLSearchParams();
      params.append('userid', data.username);
      params.append('password', data.password);
      const APP_REQUEST_API = await loginUser(params, Lang);

      if (APP_REQUEST_API.response == APP_RESPONSE.LOGIN.SUCCESS) {
        //update user general configs
        if (general_session.general_session.FirstTimeAppLogin == true) {
          general_session_action(
            {
              ...general_session.general_session,
              FirstTimeAppLogin: false,
              prevLoginUser: (APP_REQUEST_API.data.name).split(" ")[1]
            },
            {
              allow: general_session.general_session.storeLocalData,
              key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
            }
          );
        }
        else {
          general_session_action(
            {
              ...general_session.general_session,
              prevLoginUser: (APP_REQUEST_API.data.name).split(" ")[1]
            },
            {
              allow: general_session.general_session.storeLocalData,
              key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
            }
          );
        }



        //update profile state
        profile_session_action(
          APP_REQUEST_API.data,
          {
            allow: general_session.general_session.storeLocalData,
            key: REDUX_SESSION_LOCAL_STORE_KEYS.profile_session
          }
        );

        //unlock entry fields
        setData({
          ...data,
          editable: true
        })
        //disable signin button
        setSignButton({
          ...singinButton,
          showLoader: false
        });

        //Inapp user logged-in mode
        login_session_action(
          true,
          {
            allow: general_session.general_session.storeLocalData,
            key: REDUX_SESSION_LOCAL_STORE_KEYS.login_session
          }
        )

        //unlock entry fields
        setData({
          ...data,
          editable: true
        })
        //disable signin button
        setSignButton({
          ...singinButton,
          showLoader: false
        });
      }
      else {
        //couldn't login
        //unlock entry fields
        setData({
          ...data,
          editable: true
        })
        //disable signin button
        setSignButton({
          ...singinButton,
          showLoader: false
        });

        setAlertBox({
          ...alertBox,
          alertType: 'error',
          confirmText: Lang.GENERAL.ALERT_RETRY_TEXT,
          confirmAction: () => retryLogin(),
          cancelAction: () => cancelAlert(),
          message: APP_REQUEST_API.message,
          showConfirm: true,
          showAlert: true
        })

      }


    }
    else {
      setAlertBox({
        ...alertBox,
        alertType: 'error',
        showConfirm: false,
        cancelAction: () => cancelAlert(),
        message: Lang.GENERAL.EMPTY_FORM_FIELD_DETECTED,
        showAlert: true
      })
    }

    */
  }

  const recoverAction = () => {
    console.log("lets recover boss");
  }

  const verifyAction = () => {
    console.log("lets verify boss");
  }

  const registerAction = () => {
    console.log("lets register boss");
  }



  return (
    <>
    <StatusBar/>
      <View style={Theme.GMLoginStyle.container}>

        <View style={Theme.GMLoginStyle.top}>

          <View style={Theme.GMLoginStyle.topChildContainer}>

            <View style={Theme.GMLoginStyle.imageViewBox}>
              <LogoWTIcon />
            </View>

          </View>

        </View>

        <View style={Theme.GMLoginStyle.bottom}>

          <View style={Theme.GMLoginStyle.bottomChildContainer}>

            <View style={Theme.GMLoginStyle.bottomChildContainerTop}>

              <View style={Theme.GMLoginStyle.bottomChildContainerTopChild}>
                <Text numberOfLines={1} adjustsFontSizeToFit style={Theme.GMLoginStyle.bottomChildContainerTopChildText}>{Lang.GENERAL.WELCOME + (general_session.general_session.prevLoginUser == "" ? Lang.GENERAL.PREVIOUSSIGNEDINUSERDEFAULT : (" back, " + general_session.general_session.prevLoginUser))}</Text>
              </View>
              <View style={Theme.GMLoginStyle.bottomChildContainerBottomChild}>

                <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ justifyContent: 'center', paddingRight: '2%', width: '100%', alignSelf: 'center' }} scrollEnabled={true} indicatorStyle='white'>

                  <UsernameInputBox
                    theme={Theme}
                    language={Lang}
                    useCase="signin"
                    onEdit={(input) => username(input)}
                    editable={data.editable}
                  />

                  <PasskeyInputBox
                    theme={Theme}
                    language={Lang}
                    onEdit={(input) => password(input)}
                    editable={data.editable}
                  />


                </ScrollView>

              </View>

            </View>

            <KeyboardAvoidingView style={Theme.GMLoginStyle.bottomChildContainerBottom} behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={false}>

              <View style={Theme.GMLoginStyle.bottomChildContainerBottomTextView}>

                <View style={Theme.GMLoginStyle.bottomChildContainerBottomTextViewCont1}>

                  <Text numberOfLines={1} adjustsFontSizeToFit style={Theme.GMLoginStyle.bottomChildContainerBottomTextViewContText1}>{Lang.LOGIN_SCREEN.FORGOTPASSKEY + " "}</Text>
                  <TouchableOpacity onPress={() => recoverAction()}><Text numberOfLines={1} adjustsFontSizeToFit style={Theme.GMLoginStyle.bottomChildContainerBottomTextViewContText2}>{Lang.LOGIN_SCREEN.RECOVER + "  "}</Text></TouchableOpacity>

                </View>

                <View style={Theme.GMLoginStyle.bottomChildContainerBottomTextViewCont2}>

                  <Text numberOfLines={1} adjustsFontSizeToFit style={Theme.GMLoginStyle.bottomChildContainerBottomTextViewContText1}>{Lang.LOGIN_SCREEN.NEWUSER + " "}</Text>
                  <TouchableOpacity onPress={() => registerAction()}><Text numberOfLines={1} adjustsFontSizeToFit style={Theme.GMLoginStyle.bottomChildContainerBottomTextViewContText2}>{Lang.GENERAL.SIGNUP}</Text></TouchableOpacity>

                </View>

              </View>

              <View style={Theme.GMLoginStyle.bottomChildContainerBottomMainButtonView}>

                <MainButton theme={Theme} language={Lang} title={Lang.GENERAL.SIGNIN} isWithLoader={singinButton} onAction={() => loginAction()} />

              </View>

            </KeyboardAvoidingView>

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
        cancelAction={alertBox.cancelAction}
        confirmText={alertBox.confirmText}
        showConfirm={alertBox.showConfirm}
        confirmAction={alertBox.confirmAction}
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

export default connect(mapStateToProps, mapDispatchToProps)(GMLogin);
