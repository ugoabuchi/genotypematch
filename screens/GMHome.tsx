import * as Notifications from 'expo-notifications';
import React, { useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  FlatList
} from 'react-native';
import {
  changeLoginSession,
  changeProfileSession,
  changeGeneralSession
} from '../redux/actions/Session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoIcon } from '../components/logo';
import { Image } from "react-native";
import { Badge } from 'react-native-paper';
import { getAge, getCountryByIndex, getCountryIndexByCountryCode, getCountryStateIndexByCountryCodeandState, getMyCountryCodeName, isLoggedIn, myCountryList, myCountryStatelist, SvgImager } from '../components/common';
import { MyAlert } from '../components/PopUp';
import { AccountListDropDown, AgeListDropDown, CountryListDropDown, CountryStateListDropDown, GenderListDropDown, GenotypeListDropDown } from '../components/ListDropDown';
import { getMatchResults, sendYUP, sendNope, getAvailableGiftFromServer } from '../components/axios';
import { AlertBoxStateParamType, MatchFilterType, NavPropsType, MatchesCardType, CardType, buttonParamType, LoadedGifts } from '../types';
import { BloodBagIcon, FemaleGenderIcon, FilterIcon, GiftIcon, MaleGenderIcon, MenuIcon, NopeIcon, PREMIUMDisplayIcon, VerifiedUser100Icon, VIPDisplayIcon, YupIcon, BASICDisplayIcon, VerifiedUser50Icon, VerifiedUser10Icon, LoadIndicator, PrimaryLoadingIndicator, LocationIcon } from '../components/Icon';
import { PulseViewAnimation } from '../components/Animations';
import { ACCOUNT_TYPES, GM_NOTIFICATION, MATCH_REQUEST_LIMIT, REDUX_SESSION_LOCAL_STORE_KEYS, ReQUEST_Gift_IMAGE_URL, ReQUEST_IMAGE_URL } from '../constants/constants';
import { requestGeoLocationPermission, getGeoLocationPermission, getGeoCoords, getGeoCoordsLocationDetails } from '../components/locationManager';
import SwipeCards from 'react-native-swipe-cards-deck';
import { SubButton } from '../components/Button';
import { PermissionStatus } from 'expo-location';
import StatusBar from '../components/Statusbar';
import { ModalPopUpBox } from '../components/Modal';
import {APP_RESPONSE} from '../constants/constants';


    //Setting notification handler


const GMHome = ({ navigation, route, login_session, profile_session, general_session, login_session_action, profile_session_action, general_session_action }: NavPropsType) => {

  const Theme = general_session.general_session.theme_mode;
  const Lang = general_session.general_session.Language;

  //set notification state variables
  const backHandlerListener = useRef<any>();
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

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


  const [accoountIndex, setAccountIndex] = useState<number>(4)

  const [countryIndex, setCountryIndex] = useState<number>(0)

  const [stateIndex, setStateIndex] = useState<number>(0)

  const [genderIndex, setGenderIndex] = useState<number>(3)

  const [genotypeIndex, setGenotypeIndex] = useState<number>(7)

  const [agerangeIndex, setAgerangeIndex] = useState<number>(7)

  const [requestOffset, setRequestOffset] = useState<number>(0);

  const [temporaryFilterValues, setTemporaryFilterValues] = useState<MatchFilterType>({
    account: 4,
    country: 0,
    state: 0,
    gender: 3,
    genotype: 7,
    agerange: 7

  })

  const [countryDefaultIndex, setCountryDefaultIndex] = useState<number>(0);

  const [countryStateDefaultIndex, setCountryStateDefaultIndex] = useState<number>(0);

  const [accountDefaultIndex, setAccountDefaultIndex] = useState<number>(4);

  const [genderDefaultIndex, setGenderDefaultIndex] = useState<number>(3);

  const [agerangeDefaultIndex, setAgerangeDefaultIndex] = useState<number>(7);

  const [genotypeDefaultIndex, setGenotypeDefaultIndex] = useState<number>(7);

  const [modalFilterTitle, setModalFilterTitle] = useState<string>(null);

  const [showMyModalFilter, setShowMyModalFilter] = useState<boolean>(false);

  const [showModalFilterConfirm, setShowModalFilterConfirm] = useState<boolean>(true);

  const [modalFilterConfirmText, setModalFilterConfirmText] = useState<string>(null);



  const [giftFilterTitle, setGiftFilterTitle] = useState<string>(null);

  const [showMyGoftFilter, setShowMyGiftFilter] = useState<boolean>(false);

  const [showModalGiftConfirm, setShowModalGiftConfirm] = useState<boolean>(true);

  const [giftFilterConfirmText, setGiftFilterConfirmText] = useState<string>(null);

  const [giftID, setGiftID] = useState<string>(null);

  const [giftUserID, setGiftUserID] = useState<string>(null);

  const [giftItems, setGiftitems] = useState<LoadedGifts[]>(null);
  
  const [giftsLoading, setGiftloading] = useState<boolean>(false);




  const [cards, setCard] = useState<MatchesCardType[]>(null);

  const [swiper, setSwiper] = useState<any>({ swipeYup: () => { }, swipeNope: () => { }, swipeMaybe: () => { } });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loadingMessage, setLoadingMessage] = useState<string>(null);


  const [isLocation, setisLocation] = useState<{
    enabled: boolean | string,
    loading: buttonParamType,
    message: string
    }>({
    enabled: PermissionStatus.DENIED,
    message: null,
    loading: {
      isLoader: true,
      showLoader: false
    }
  });








  useEffect(() => {
    //BackHandlerCallBack
   backHandlerListener.current = BackHandler.addEventListener("hardwareBackPress", () => {
      setAlertBox({
        ...alertBox,
        alertType: "warning",
        title: null,
        message: Lang.GENERAL.EXITAPP,
        cancelText: Lang.GENERAL.NO,
        confirmText: Lang.GENERAL.YES,
        showConfirm: true,
        showAlert: true,
        cancelAction: () => cancelAlert(),
        confirmAction: () => BackHandler.exitApp()
      });
      return true;
    });

    Notifications.setNotificationHandler({


      handleNotification: async ( notification: Notifications.Notification ) => {
        
        const recievedContent = notification.request.content.data;

        if(recievedContent.response != undefined && recievedContent.response != null)
        {

          if(recievedContent.response == GM_NOTIFICATION.YUP_USER_SUCESS 
            || recievedContent.response == GM_NOTIFICATION.USER_MATCH_SUCCESS 
            || recievedContent.response == GM_NOTIFICATION.YUP_ALREADY_SUCCESS 
            || recievedContent.response == GM_NOTIFICATION.YUP_INVALID_MATCH_USER 
            || recievedContent.response == GM_NOTIFICATION.GIFT_USER_SUCCESS 
            || recievedContent.response == GM_NOTIFICATION.GIFT_INSUFFICIENT_GC 
            || recievedContent.response == GM_NOTIFICATION.GIFT_SELECTED_GIFT_ITEM_UNAVAILABLE 
            || recievedContent.response == GM_NOTIFICATION.GIFT_INVALID_MATCH_USER 
            || recievedContent.response == GM_NOTIFICATION.CHAT_MESSAGE_RECIEVED 
            || recievedContent.response == GM_NOTIFICATION.CHAT_MESSAGE_ERROR 
            || recievedContent.response == GM_NOTIFICATION.ADMIN_MESSAGE_RECIEVED
            || recievedContent.response == GM_NOTIFICATION.USER_UNMATCH_RECIEVED){

            return {
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            }

          }
          else{

          return {
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }
          
        }

        }
        else{

          return {
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }
          
        }

      },



    });

    notificationListener.current = Notifications.addNotificationReceivedListener( ( notification: Notifications.Notification )  => {
      //setNotification(notification);
      const recievedContent = notification.request.content.data;
      if(recievedContent.response == GM_NOTIFICATION.YUP_USER_SUCESS 
        || recievedContent.response == GM_NOTIFICATION.YUP_ALREADY_SUCCESS 
        || recievedContent.response == GM_NOTIFICATION.YUP_INVALID_MATCH_USER 
        || recievedContent.response == GM_NOTIFICATION.GIFT_USER_SUCCESS 
        || recievedContent.response == GM_NOTIFICATION.GIFT_INSUFFICIENT_GC 
        || recievedContent.response == GM_NOTIFICATION.GIFT_SELECTED_GIFT_ITEM_UNAVAILABLE 
        || recievedContent.response == GM_NOTIFICATION.GIFT_INVALID_MATCH_USER 
        || recievedContent.response == GM_NOTIFICATION.CHAT_MESSAGE_ERROR 
        || recievedContent.response == GM_NOTIFICATION.ADMIN_MESSAGE_RECIEVED
        || recievedContent.response == GM_NOTIFICATION.USER_UNMATCH_RECIEVED){

          general_session_action(
            {
              ...general_session.general_session,
              GNC: recievedContent.GNC
            },
            {
              allow: general_session.general_session.storeLocalData,
              key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
            }
          );
          

        }
      else if(recievedContent.response == GM_NOTIFICATION.USER_MATCH_SUCCESS){

        general_session_action(
          {
            ...general_session.general_session,
            MNC: recievedContent.MNC
          },
          {
            allow: general_session.general_session.storeLocalData,
            key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
          }
        );
        
      }
      else if(recievedContent.response == GM_NOTIFICATION.CHAT_MESSAGE_RECIEVED){
        
        general_session_action(
          {
            ...general_session.general_session,
            CNC: recievedContent.CNC
          },
          {
            allow: general_session.general_session.storeLocalData,
            key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
          }
        );

      }
      //console.log(recievedContent);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener( (response: Notifications.NotificationResponse) => {
      const recievedContent = response.notification.request.content.data;

      if(recievedContent.response == GM_NOTIFICATION.YUP_USER_SUCESS
        || recievedContent.response == GM_NOTIFICATION.YUP_ALREADY_SUCCESS 
        || recievedContent.response == GM_NOTIFICATION.YUP_INVALID_MATCH_USER 
        || recievedContent.response == GM_NOTIFICATION.GIFT_USER_SUCCESS 
        || recievedContent.response == GM_NOTIFICATION.GIFT_INSUFFICIENT_GC 
        || recievedContent.response == GM_NOTIFICATION.GIFT_SELECTED_GIFT_ITEM_UNAVAILABLE 
        || recievedContent.response == GM_NOTIFICATION.GIFT_INVALID_MATCH_USER 
        || recievedContent.response == GM_NOTIFICATION.CHAT_MESSAGE_ERROR 
        || recievedContent.response == GM_NOTIFICATION.ADMIN_MESSAGE_RECIEVED
        || recievedContent.response == GM_NOTIFICATION.USER_UNMATCH_RECIEVED){

          general_session_action(
            {
              ...general_session.general_session,
              GNC: recievedContent.GNC
            },
            {
              allow: general_session.general_session.storeLocalData,
              key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
            }
          );

        navigation.navigate('AfterLogin', {
          screen: 'Notifications'
        });

      }
      else if(recievedContent.response == GM_NOTIFICATION.USER_MATCH_SUCCESS){

        general_session_action(
          {
            ...general_session.general_session,
            MNC: recievedContent.MNC
          },
          {
            allow: general_session.general_session.storeLocalData,
            key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
          }
        );
        navigation.navigate('AfterLogin', {
          screen: 'Matches'
        });
      }
      else if(recievedContent.response == GM_NOTIFICATION.CHAT_MESSAGE_RECIEVED){

        general_session_action(
          {
            ...general_session.general_session,
            CNC: recievedContent.CNC
          },
          {
            allow: general_session.general_session.storeLocalData,
            key: REDUX_SESSION_LOCAL_STORE_KEYS.general_session
          }
        );
        navigation.navigate('AfterLogin', {
          screen: 'Chats'
        });
      }

    });


    //set GiftID

    setGiftID("");
    setGiftUserID("");
    setGiftloading(false);

    
    //update permission state
    getGeoLocationPermission_sub()


    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backHandlerListener.current);
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, [])

  useEffect(()=>{
    if(isLocation.enabled == true && isLoading == false)
    {
      loadMatches(true);
    }
  }, [isLocation])

 

  isLoggedIn({
    login_session: login_session,
    mandate: false,
    yourCallBack: () => {
      navigation.replace('GMLogin');
    }
  });

  const cancelAlert = () => {
    setAlertBox({
      ...alertBox,
      showAlert: false
    });
  }


  const filterAccepted = () : {value: boolean, message ?: string} => {

    const {accounttype} = profile_session.profile_session;
    //check basic plan settings
    if(accounttype == ACCOUNT_TYPES.VIP)
    {
      return {
        value: true
      }
    }
    else if(accounttype == ACCOUNT_TYPES.PREMIUM)
    {
      if(genotypeIndex != genotypeDefaultIndex || accoountIndex != accountDefaultIndex)
      {
        return {
          value: false,
          message: Lang.GENERAL.VIPUPGRADE
        }
      }
      else
      {
        return {
          value: true
        }
      }
    }
    else
    {
      if(countryIndex != countryDefaultIndex || stateIndex != countryStateDefaultIndex || genderIndex != genderDefaultIndex || genotypeIndex != genotypeDefaultIndex || accoountIndex != accountDefaultIndex || agerangeIndex != agerangeDefaultIndex)
      {
        return {
          value: false,
          message: Lang.GENERAL.ACCOUNTUPGRADE
        }
      }
      else
      {
        return {
          value: true
        }
      }
    }

  }


  const loadMatches =  async (firstmount: boolean) => {

    if(isLoading != true)
    {
      setIsLoading(true);
    }

   //check filter
   const filteredValue = filterAccepted();
   if(filteredValue.value != true){

    //set previous filter options
                  setAccountIndex(temporaryFilterValues.account);
                  setCountryIndex(temporaryFilterValues.country);
                  setStateIndex(temporaryFilterValues.state);
                  setGenderIndex(temporaryFilterValues.gender);
                  setGenotypeIndex(temporaryFilterValues.genotype);
                  setAgerangeIndex(temporaryFilterValues.agerange);
    

    //show alert
   if(firstmount == false)
   {
    setAlertBox({
      ...alertBox,
      alertType: "warning",
      title: null,
      message: filteredValue.message,
      cancelText: Lang.GENERAL.OK,
      showConfirm: false,
      showAlert: true,
      cancelAction: () => cancelAlert(),
    })
   }

   setCard([]);
   setIsLoading(false);

   }
   else
   {

    /*await getGeoLocationPermission_sub();*/

   if(isLocation.enabled == true)
   {
      //get Location coords
      //const coords = await getGeoCoords();
      const coords : {latitude : number, longitude: number} = {latitude: 6.5243793, longitude: 3.3792057};
      if(coords)
      {
      //set and send request to server
      //send to API Server

      //const reverseCoords = await getGeoCoordsLocationDetails(coords);
      const reverseCoords :  {country: string, region: string, street: string, CountryCode: string} = {
        country: "Nigeria",
        region: "Lagos",
        street: "Oyewole",
        CountryCode: "NG"
      }
    
      if(reverseCoords == undefined || reverseCoords == null)
      {
        
        if(firstmount == false)
        {

          setAlertBox({
            ...alertBox,
            alertType: "warning",
            title: null,
            message: Lang.GENERAL.LOCATION_DETAILS_UNDEFINED,
            cancelText: Lang.GENERAL.OK,
            showConfirm: false,
            showAlert: true,
            cancelAction: () => cancelAlert(),
          })

        }
        
        setisLocation({
          ...isLocation,
          enabled: PermissionStatus.DENIED,
          message: Lang.GENERAL.LOCATION_DETAILS_UNDEFINED
        });
          setIsLoading(false);
      }
      else
      {

      if(cards == null)
      {
        const countryIndexValue : number = getCountryIndexByCountryCode(reverseCoords.CountryCode);
        const countryStateIndexValue : number = getCountryStateIndexByCountryCodeandState(reverseCoords.CountryCode, reverseCoords.region);

        setCountryIndex(countryIndexValue);
        setStateIndex(countryStateIndexValue);
        setCountryDefaultIndex(countryIndexValue);
        setCountryStateDefaultIndex(countryStateIndexValue)

        const {accounttype} = profile_session.profile_session;
          //set to all for VIP DEFAULT
          if(accounttype == ACCOUNT_TYPES.VIP)
          {
            setAccountIndex(0);
            setGenderIndex(0);
            setGenotypeIndex(0);
            setAgerangeIndex(0);
            setAccountDefaultIndex(0);
            setGenderDefaultIndex(0);
            setGenotypeDefaultIndex(0);
            setAgerangeDefaultIndex(0);

        const params = new URLSearchParams();
        params.append('userid', profile_session.profile_session.username);
        params.append('token',profile_session.profile_session.token);
        params.append('coords', coords.latitude +"BLARK"+ coords.longitude);
        params.append('country', reverseCoords.CountryCode);
        params.append('city', reverseCoords.region);
        params.append('account',0+"");
        params.append('gender',0+"");
        params.append('bloodgroup',0+"");
        params.append('agerange',0+"");
        params.append('reqcountry', getMyCountryCodeName(myCountryList()[countryIndexValue]));
        params.append('reqcity',(myCountryStatelist(getMyCountryCodeName(myCountryList()[countryIndexValue])))[countryStateIndexValue]);
        params.append('limit',MATCH_REQUEST_LIMIT+"");
        params.append('offset',requestOffset+"");
        
         const APP_REQUEST_API = await getMatchResults(params, Lang);
          if(APP_REQUEST_API.response == APP_RESPONSE.MATCHES.SUCCESS)
          {
            setCard(APP_REQUEST_API.data);
          }
          else
          {
            const error = APP_REQUEST_API.response;
            setCard([]);
          }


          }
          else if(accounttype == ACCOUNT_TYPES.PREMIUM)
          {
            setGenderIndex(0);
            setAgerangeIndex(0);
            setGenderDefaultIndex(0);
            setAgerangeDefaultIndex(0);

            const params = new URLSearchParams();
        params.append('userid', profile_session.profile_session.username);
        params.append('token',profile_session.profile_session.token);
        params.append('coords', coords.latitude +"BLARK"+ coords.longitude);
        params.append('country', reverseCoords.CountryCode);
        params.append('city', reverseCoords.region);
        params.append('account',accoountIndex+"");
        params.append('gender',0+"");
        params.append('bloodgroup',genotypeIndex+"");
        params.append('agerange',0+"");
        params.append('reqcountry', getMyCountryCodeName(myCountryList()[countryIndexValue]));
        params.append('reqcity',(myCountryStatelist(getMyCountryCodeName(myCountryList()[countryIndexValue])))[countryStateIndexValue]);
        params.append('limit',MATCH_REQUEST_LIMIT+"");
        params.append('offset',requestOffset+"");
        
        const APP_REQUEST_API = await getMatchResults(params, Lang);
  
        if(APP_REQUEST_API.response == APP_RESPONSE.MATCHES.SUCCESS)
        {
          setCard(APP_REQUEST_API.data);
        }
        else
        {
          const error = APP_REQUEST_API.response;
          setCard([]);
        }


          }
          else 
          {

            const params = new URLSearchParams();
        params.append('userid', profile_session.profile_session.username);
        params.append('token',profile_session.profile_session.token);
        params.append('coords', coords.latitude +"BLARK"+ coords.longitude);
        params.append('country', reverseCoords.CountryCode);
        params.append('city', reverseCoords.region);
        params.append('account',accoountIndex+"");
        params.append('gender',genderIndex+"");
        params.append('bloodgroup',genotypeIndex+"");
        params.append('agerange',agerangeIndex+"");
        params.append('reqcountry', getMyCountryCodeName(myCountryList()[countryIndexValue]));
        params.append('reqcity',(myCountryStatelist(getMyCountryCodeName(myCountryList()[countryIndexValue])))[countryStateIndexValue]);
        params.append('limit',MATCH_REQUEST_LIMIT+"");
        params.append('offset',requestOffset+"");
        
        const APP_REQUEST_API = await getMatchResults(params, Lang);
  
        if(APP_REQUEST_API.response == APP_RESPONSE.MATCHES.SUCCESS)
        {
          setCard(APP_REQUEST_API.data);
        }
        else
        {
          const error = APP_REQUEST_API.response;
          setCard([]);
        }


          }
          

        
          
          setIsLoading(false);
          
      }
      else
      {

        const params = new URLSearchParams();
        params.append('userid', profile_session.profile_session.username);
        params.append('token',profile_session.profile_session.token);
        params.append('coords', coords.latitude +"BLARK"+ coords.longitude);
        params.append('country', reverseCoords.CountryCode);
        params.append('city', reverseCoords.region);
        params.append('account',accoountIndex+"");
        params.append('gender',genderIndex+"");
        params.append('bloodgroup',genotypeIndex+"");
        params.append('agerange',agerangeIndex+"");
        params.append('reqcountry', getMyCountryCodeName(myCountryList()[countryIndex]));
        params.append('reqcity',(myCountryStatelist(getMyCountryCodeName(myCountryList()[countryIndex])))[stateIndex]);
        params.append('limit',MATCH_REQUEST_LIMIT+"");
        params.append('offset',requestOffset+"");
        
        const APP_REQUEST_API = await getMatchResults(params, Lang);
  
        if(APP_REQUEST_API.response == APP_RESPONSE.MATCHES.SUCCESS)
        {
          setCard(APP_REQUEST_API.data);
        }
        else
        {
          const error = APP_REQUEST_API.response;
          setCard([]);
        }
          setIsLoading(false);
          
      }


     

      
        
      }


      

      }
      else
      {


        if(firstmount == false)
        {

          setAlertBox({
            ...alertBox,
            alertType: "warning",
            title: null,
            message: Lang.GENERAL.LOCATION_COORDS_NOT_FOUND,
            cancelText: Lang.GENERAL.OK,
            showConfirm: false,
            showAlert: true,
            cancelAction: () => cancelAlert(),
          })
          
        }

        setisLocation({
          ...isLocation,
          enabled: PermissionStatus.DENIED,
          message: Lang.GENERAL.LOCATION_COORDS_NOT_FOUND
        });

        setIsLoading(false);
      }
  
    
    

   }
   else
   {

    //update location states params
    
    rquestLocationPermission_sub();
    setIsLoading(false);
    
   }


   }



   

    
   

  }

  const getGeoLocationPermission_sub = async () => {

      const {status} = await getGeoLocationPermission();
      setisLocation({
        ...isLocation,
        enabled: status,
        message: status == true ? null : (status == PermissionStatus.DENIED ? Lang.GENERAL.DEFAULT_LOCATION_DENIED_TEXT : Lang.GENERAL.DEFAULT_LOCATION_BLOCKED_TEXT),
        loading: {
          ...isLocation.loading,
          showLoader: false
        },
      });


  }


  const rquestLocationPermission_sub = async () => {
    //request location permission

    
    if (isLocation.enabled != true) {
      
      setisLocation({
        ...isLocation,
        loading: {
          ...isLocation.loading,
          showLoader: true
        }
      });
  
      const {status} = await requestGeoLocationPermission();
      setisLocation({
        ...isLocation,
        enabled: status,
        message: status == true ? null : ((status == PermissionStatus.DENIED || status == "notEnabled") ? Lang.GENERAL.DEFAULT_LOCATION_DENIED_TEXT : Lang.GENERAL.DEFAULT_LOCATION_BLOCKED_TEXT),
        loading: {
          ...isLocation.loading,
          showLoader: false
        }
      });

      if(status != true)
      {
        setAlertBox({
          ...alertBox,
          alertType: "error",
          title: null,
          message: status == "notEnabled" ? Lang.GENERAL.ENABLE_LOCATION_SERVICES : Lang.GENERAL.LOCATION_BLOCKED_OR_UNAVAILABLE_FIX_ERROR_TEXT,
          cancelText: Lang.GENERAL.OK,
          showConfirm: false,
          showAlert: true,
          cancelAction: () => cancelAlert(),
        })
      }

  }


}


const handleOpenSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

 
  //set Account
  const setAccount = (index: number) => {
    setAccountIndex(index);
  }

  //set Age range
  const setAgeRange = (index: number) => {
    setAgerangeIndex(index)
  }

  //set Genotype
  const setGenotype = (index: number) => {
    setGenotypeIndex(index)
  }

  //set Country Code
  const setCountry = (index: number) => {
    setCountryIndex(index);
    setStateIndex(0);
  }

  //set Country State
  const setCountryState = (index: number) => {
    setStateIndex(index)
  }

  //set Gender
  const setGender = (index: number) => {
    setGenderIndex(index)
  }

  //Filter Search Action
  const filterSearch = () => {
    setShowMyModalFilter(false);
    loadMatches(false);

  }

  const filterClose = () => {
      setShowMyModalFilter(false);
      //setAccountIndex(temporaryFilterValues.account);
                  //setCountryIndex(temporaryFilterValues.country);
                  //setStateIndex(temporaryFilterValues.state);
                  //setGenderIndex(temporaryFilterValues.gender);
                  //setGenotypeIndex(temporaryFilterValues.genotype);
                  //setAgerangeIndex(temporaryFilterValues.agerange);
                 
  }

  const sendGift = () =>{
    if(giftID != null && giftID != "")
    {
      setShowMyGiftFilter(false);

      const currentGiftIDToUse = giftID;
      const cuttentGiftUserIDToUse = giftUserID;
    //lets send the gift here


    }
    else
    {
      setAlertBox({
        ...alertBox,
        alertType: "error",
        title: null,
        message: Lang.GENERAL.DEFAULT_GIFT_SEND_ERROR,
        cancelText: Lang.GENERAL.DEFAULT_ALERT_CANCEL_TEXT,
        showConfirm: false,
        showAlert: true,
        cancelAction: () => cancelAlert()
      });
    }
  }
  

  const giftModalClose = () =>{

    setGiftID("");
    setGiftUserID("");

    if(giftsLoading == true)
      setGiftloading(false);
    
    setShowMyGiftFilter(false);
    
  }

  const LoadAvailableGifts = async (coords: {latitude: number, longitude: number}, matchuserdbID: string) =>{
    
    if(giftsLoading == false)
      setGiftloading(true);

    if(showMyGoftFilter == false)
      setShowMyGiftFilter(true);
      const params = new URLSearchParams();
        params.append('userid', profile_session.profile_session.username);
        params.append('token',profile_session.profile_session.token);
        params.append('coords', coords.latitude +"BLARK"+ coords.longitude);
        const APP_REQUEST_API = await getAvailableGiftFromServer(params, Lang);
        if(APP_REQUEST_API.response == APP_RESPONSE.LOAD_GIFT_ITEMS_AVAIL.SUCCESS)
        {
          setGiftitems(APP_REQUEST_API.data);
          setGiftUserID(matchuserdbID);
          setGiftloading(false);
        }
        else
        {
          const error = APP_REQUEST_API.response;
          setGiftitems([]);
          setGiftUserID("");
          setGiftloading(false);
        }
      //sample gift result for testing, delete and load from API using axios
      /*setGiftitems(
        [
          {key: 0, identifier:'HJklsoo13JDK98eRTyEHHDJCKsfsKSIkkd1', ext: 'gif'},
          {key: 1, identifier:'XcBNDoi34JkOiusoIOEuMjkaiOlakLoIUn1', ext: 'gif'},
          {key: 2, identifier:'POu3JKKoIEknJjjskKKAkKEEKKKahHgDH2', ext: 'gif'},
          {key: 3, identifier:'XcBNDoi34JkOiusoIOEuMjkaiOlakLoIUn1', ext: 'gif'},
          {key: 4, identifier:'POu3JKKoIEknJjjskKKAkKEEKKKahHgDH2', ext: 'gif'},
          {key: 5, identifier:'HJklsoo13JDK98eRTyEHHDJCKsfsKSIkkd1', ext: 'gif'},
        ]
      )*/

  

    

  }
    

  

  //hold previous temp filter values when in filter menu
  const storeTemporaryFilterValue = (previouaFilter: MatchFilterType) => {
    setTemporaryFilterValues(previouaFilter);
  }



  const handleYup = (currentCard: MatchesCardType) => {

    YUPRequester(currentCard.id);
    return true;

  }

  const handleNope = (currentCard: MatchesCardType) => {

    NopeRequester(currentCard.id);
    return true;

  }

  const handleGift = (currentCard: MatchesCardType) => {
    
    GiftRequester(currentCard.id);
    return false;

  }


  const yupAction = () => {
    swiper.swipeYup();
  }

  const nopeAction = () => {
    swiper.swipeNope();
  }

  const giftAction = () => {
    swiper.swipeMaybe();
  }


  const YUPRequester = async (matchuserdbID: string) : Promise<void> => {

    const coords = await getGeoCoords();
      if(coords)
      {
        const params = new URLSearchParams();
        params.append('userid', profile_session.profile_session.username);
        params.append('token', profile_session.profile_session.token);
        params.append('matchuserdbID', matchuserdbID);
        params.append('coords', coords.latitude +"BLARK"+ coords.longitude);
        await sendYUP(params, Lang);
      }

  }

  const NopeRequester = async (matchuserdbID: string) : Promise<void> => {

    const coords = await getGeoCoords();
      if(coords)
      {
        const params = new URLSearchParams();
        params.append('userid', profile_session.profile_session.username);
        params.append('token', profile_session.profile_session.token);
        params.append('matchuserdbID', matchuserdbID);
        params.append('coords', coords.latitude +"BLARK"+ coords.longitude);
        await sendNope(params, Lang);
      }

  }

  const GiftRequester = async (matchuserdbID: string) : Promise<void> => {

    //const coords = await getGeoCoords();
    const coords : {latitude : number, longitude: number} = {latitude: 6.5243793, longitude: 3.3792057};
    setGiftID("");
    setGiftUserID("");
    setGiftFilterTitle(Lang.GENERAL.DEFAULT_GIFT_MODAL_TITLE);
    setShowModalGiftConfirm(true);
    setGiftFilterConfirmText(Lang.GENERAL.DEFAULT_GIFT_SEND_TEXT);
    LoadAvailableGifts(coords, matchuserdbID);

  }

  const NopeSwipeDesign = () => {
    const SCREEN_WIDTH = Dimensions.get('window').width
    return (
      <Text style={{
        flex: 1,
        fontSize: 30,
        color: '#d60d0d',
        borderWidth: 0,
        borderRadius: 0,
        width: SCREEN_WIDTH - (18 * (SCREEN_WIDTH / 100)),
        textAlign: 'center'
      }}>Nope</Text>
    );
  }

  const YupSwipeDesign = () => {
    const SCREEN_WIDTH = Dimensions.get('window').width
    return (
      <Text style={{
        flex: 1,
        fontSize: 30,
        color: '#269124',
        borderWidth: 0,
        borderRadius: 0,
        width: SCREEN_WIDTH - (18 * (SCREEN_WIDTH / 100)),
        textAlign: 'center'
      }}>Yup</Text>
    );
  }

  const GiftSwipeDesign = () => {
    const SCREEN_WIDTH = Dimensions.get('window').width
    return (
      <Text style={{
        flex: 1,
        fontSize: 30,
        color: '#ff8000',
        borderWidth: 0,
        borderRadius: 0,
        width: SCREEN_WIDTH - (18 * (SCREEN_WIDTH / 100)),
        textAlign: 'center'
      }}>Gift</Text>
    );

  }


  //Home Filter Component
  const FilterContent = () => (
      <View>

      <View style={Theme.GMHomeScreenStyle.HomeFilterContainer}>
        <View style={Theme.GMHomeScreenStyle.HomeFilterTextBox}>
          <Text numberOfLines={1} style={Theme.GMHomeScreenStyle.HomeFilterText} adjustsFontSizeToFit={true} >{Lang.GENERAL.ACCOUNT}</Text>
        </View>

        <View style={Theme.GMHomeScreenStyle.HomeFilterComponentBox}>
          <AccountListDropDown
            theme={Theme}
            defaultIndex={accoountIndex}
            language={Lang}
            yourCallBack={(index) => {setAccount(index)}}
          />

        </View>
      </View>



      <View style={Theme.GMHomeScreenStyle.HomeFilterContainer}>
        <View style={Theme.GMHomeScreenStyle.HomeFilterTextBox}>
          <Text numberOfLines={1} style={Theme.GMHomeScreenStyle.HomeFilterText} adjustsFontSizeToFit={true} >{Lang.GENERAL.COUNTRY}</Text>
        </View>

        <View style={Theme.GMHomeScreenStyle.HomeFilterComponentBox}>
          <CountryListDropDown
            theme={Theme}
            defaultIndex={countryIndex}
            language={Lang}
            yourCallBack={(index) => {setCountry(index)}}
          />

        </View>
      </View>



      <View style={Theme.GMHomeScreenStyle.HomeFilterContainer}>
        <View style={Theme.GMHomeScreenStyle.HomeFilterTextBox}>
          <Text numberOfLines={1} style={Theme.GMHomeScreenStyle.HomeFilterText} adjustsFontSizeToFit={true} >{Lang.GENERAL.STATE}</Text>
        </View>

        <View style={Theme.GMHomeScreenStyle.HomeFilterComponentBox}>
          <CountryStateListDropDown
            theme={Theme}
            countryCode={getCountryByIndex(countryIndex).code}
            defaultIndex={stateIndex}
            language={Lang}
            yourCallBack={(index) => {setCountryState(index)}}
          />

        </View>
      </View>



      <View style={Theme.GMHomeScreenStyle.HomeFilterContainer}>
        <View style={Theme.GMHomeScreenStyle.HomeFilterTextBox}>
          <Text numberOfLines={1} style={Theme.GMHomeScreenStyle.HomeFilterText} adjustsFontSizeToFit={true} >{Lang.GENERAL.GENDER}</Text>
        </View>

        <View style={Theme.GMHomeScreenStyle.HomeFilterComponentBox}>
          <GenderListDropDown
            theme={Theme}
            defaultIndex={genderIndex}
            language={Lang}
            yourCallBack={(index) => {setGender(index)}}
          />

        </View>
      </View>



      <View style={Theme.GMHomeScreenStyle.HomeFilterContainer}>
        <View style={Theme.GMHomeScreenStyle.HomeFilterTextBox}>
          <Text numberOfLines={1} style={Theme.GMHomeScreenStyle.HomeFilterText} adjustsFontSizeToFit={true} >{Lang.GENERAL.GENOTYPE}</Text>
        </View>

        <View style={Theme.GMHomeScreenStyle.HomeFilterComponentBox}>
          <GenotypeListDropDown
            theme={Theme}
            defaultIndex={genotypeIndex}
            language={Lang}
            yourCallBack={(index) => {setGenotype(index)}}
          />

        </View>
      </View>


      <View style={Theme.GMHomeScreenStyle.HomeFilterContainer}>
        <View style={Theme.GMHomeScreenStyle.HomeFilterTextBox}>
          <Text numberOfLines={1} style={Theme.GMHomeScreenStyle.HomeFilterText} adjustsFontSizeToFit={true} >{Lang.GENERAL.AGERANGE}</Text>
        </View>

        <View style={Theme.GMHomeScreenStyle.HomeFilterComponentBox}>
          <AgeListDropDown
            theme={Theme}
            defaultIndex={agerangeIndex}
            language={Lang}
            yourCallBack={(index) => {setAgeRange(index)}}
          />

        </View>
      </View>

    </View>

    )
    


  //Card Deck Component
  const HomeCardDeck = ({ card }: CardType) => {
    
    const CardDeckItem = ({}) => {

      const [countryImageSrc, setCountryImageSrc] = useState(null);
    const [imagesLoading, setImagesLoading] = useState<{
      profileImage: boolean,
      countryImage: Boolean
    }>({
      profileImage: true,
      countryImage: true
    });


    useEffect(() => {

      async function loadStaticleImages() {


        setCountryImageSrc("https://cdn.ipwhois.io/flags/"+(card.lastseencountry).toLowerCase()+".svg");
          setImagesLoading({
            ...imagesLoading,
            countryImage: false
          });

      }

      loadStaticleImages();

    }, [])


    return (
      <View style={Theme.HomeMatchBox.body}>
        <View style={Theme.HomeMatchBox.bodyContainer}>



          <View style={Theme.HomeMatchBox.bodyChild1}>
            <View style={Theme.HomeMatchBox.bc1c1}>
              <View style={Theme.HomeMatchBox.bc1c1child1}>

                {
                  imagesLoading.countryImage == true
                    ?
                    (
                      <View style={Theme.HomeMatchBox.bc1c1childLoaaderContainer}><PrimaryLoadingIndicator theme={Theme} /></View>
                    )
                    :
                    (
                      <SvgImager url={countryImageSrc} />
                    )
                }

              </View>
              <View style={Theme.HomeMatchBox.bc1c1child3}>
                <NopeIcon theme={Theme} actionPressed={() => nopeAction()} />
              </View>


            </View>



            <View style={Theme.HomeMatchBox.bc1c2}>

                      <View style={[Theme.HomeMatchBox.bc1c2child1, {display: imagesLoading.profileImage == true ? "flex" : "none"}]}>
                      <LoadIndicator theme={Theme} />
                      </View>

                      <View style={[Theme.HomeMatchBox.bc1c2childContainer, {display: imagesLoading.profileImage == false ? "flex" : "none"}]}>
                      <Image
                        source={{ uri: ReQUEST_IMAGE_URL + "/" + card.url }}
                        style={Theme.HomeMatchBox.bc1c2childContainerImage}
                        resizeMode='cover'
                        onLoadEnd={() => setImagesLoading({...imagesLoading, profileImage: false})}
                      />
                      </View>


            </View>




            <View style={Theme.HomeMatchBox.bc1c3}>


              <View style={Theme.HomeMatchBox.bc1c3child1}>

                <Badge size={8} style={Theme.HomeMatchBox.bc1c3c1c1} />
                <Text numberOfLines={1} style={Theme.HomeMatchBox.bc1c3c1c2} adjustsFontSizeToFit={true} >{getAge(new Date(parseInt(card.dob.split("-")[0]), parseInt(card.dob.split("-")[1]), parseInt(card.dob.split("-")[2]))) + Lang.GENERAL.YRS}</Text>
              </View>
              <View style={Theme.HomeMatchBox.bc1c3child2}>
                <YupIcon theme={Theme} actionPressed={() => yupAction()} />
              </View>

              <View style={Theme.HomeMatchBox.bc1c3child3}>
                <GiftIcon theme={Theme} actionPressed={() => giftAction()} />
              </View>


            </View>


          </View>




          <View style={Theme.HomeMatchBox.bodyChild2}>

            <View style={Theme.HomeMatchBox.bc2c1}>

              <View style={Theme.HomeMatchBox.bc2c1c1}>

                <View style={Theme.HomeMatchBox.bc2c1c1child1}>
                  <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c1c1child1Text} adjustsFontSizeToFit={true} >{Lang.GENERAL.NAME}</Text>
                </View>
                <View style={Theme.HomeMatchBox.b2c1c1child2}>
                  <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c1c1child2Text} >{card.name}</Text>
                </View>

              </View>
              <View style={Theme.HomeMatchBox.bc2c1c2}>

                <View style={Theme.HomeMatchBox.bc2c1c2child1}>
                  <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c1c2child1Text} adjustsFontSizeToFit={true} >{Lang.GENERAL.LOCATION}</Text>
                </View>
                <View style={Theme.HomeMatchBox.b2c1c2child2}>
                  <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c1c2child2Text}>{card.lastseencountry + ", " + card.lastseencity + " - " + card.distance + Lang.GENERAL.KMAWAY}</Text>
                </View>

              </View>
              <View style={Theme.HomeMatchBox.bc2c1c3}>

                <View style={Theme.HomeMatchBox.bc2c1c3child1}>
                  <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c1c3child1Text} adjustsFontSizeToFit={true} >{Lang.GENERAL.ABOUT}</Text>
                </View>
                <View style={Theme.HomeMatchBox.b2c1c3child2}>
                  <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c1c3child2Text} >{card.description}</Text>
                </View>

              </View>
            </View>

            <View style={Theme.HomeMatchBox.bc2c2}>


              {
                //Gender Display Selector
                card.gender == "Male"

                  ?

                  (
                    <View style={Theme.HomeMatchBox.bc2c2c1}>

                      <MaleGenderIcon theme={Theme} />
                      <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c1Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.MALE}</Text>

                    </View>
                  )

                  :
                  (
                    <View style={Theme.HomeMatchBox.bc2c2c1}>

                      <FemaleGenderIcon theme={Theme} />
                      <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c1Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.FEMALE}</Text>

                    </View>
                  )

              }


              {
                //Verified Display Selector
                card.accounttype == "VIP"

                  ?

                  (
                    <View style={Theme.HomeMatchBox.bc2c2c2}>
                      <PulseViewAnimation propData={
                        <VerifiedUser100Icon theme={Theme} />
                      } />
                      <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c2Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.VERIFIED100}</Text>
                    </View>
                  )

                  :

                  (
                    card.accounttype == "Premium"

                      ?

                      (
                        <View style={Theme.HomeMatchBox.bc2c2c2}>
                          <PulseViewAnimation propData={
                            <VerifiedUser50Icon theme={Theme} />
                          } />
                          <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c2Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.VERIFIED50}</Text>
                        </View>
                      )

                      :

                      (
                        <View style={Theme.HomeMatchBox.bc2c2c2}>
                          <PulseViewAnimation propData={
                            <VerifiedUser10Icon theme={Theme} />
                          } />
                          <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c2Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.VERIFIED10}</Text>
                        </View>
                      )

                  )
              }


              {
                //ACCOUNTTYPE Display Selector
                card.accounttype == "VIP"

                  ?

                  (
                    <View style={Theme.HomeMatchBox.bc2c2c3}>

                      <PulseViewAnimation propData={
                        <VIPDisplayIcon theme={Theme} />
                      } />
                      <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c3Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.ACCOUNT_LIST[3]}</Text>

                    </View>
                  )

                  :

                  (
                    card.accounttype == "Premium"

                      ?

                      (
                        <View style={Theme.HomeMatchBox.bc2c2c3}>

                          <PulseViewAnimation propData={
                            <PREMIUMDisplayIcon theme={Theme} />
                          } />
                          <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c3Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.ACCOUNT_LIST[2]}</Text>

                        </View>
                      )

                      :

                      (
                        <View style={Theme.HomeMatchBox.bc2c2c3}>

                          <PulseViewAnimation propData={
                            <BASICDisplayIcon theme={Theme} />
                          } />
                          <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c3Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.ACCOUNT_LIST[1]}</Text>

                        </View>
                      )

                  )
              }


              <View style={Theme.HomeMatchBox.bc2c2c4}>

                <BloodBagIcon theme={Theme} />
                <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c2c4Text} adjustsFontSizeToFit={true} > {Lang.GENERAL.GENOTYPE_LIST[3]}</Text>
              </View>

            </View>

          </View>




        </View>

      </View>
    )

    }

    const cardDeckRef = useRef<any>(<CardDeckItem/>);

    useEffect(()=>{

      return ()=>{
        cardDeckRef.current = null;
      }
    },[])

    
    return (cardDeckRef.current);
  }

  //Card Deck Component
  const LocationRequestComponent = ({ message = "" }: { message?: string }) => (
    <View style={Theme.HomeMatchBox.body}>
      <View style={Theme.HomeMatchBox.bodyContainer}>

        <View style={Theme.HomeMatchBox.locationView}>
          <View style={Theme.HomeMatchBox.locationContainer}>
            <View style={Theme.HomeMatchBox.locationContainIconBox}>
              <PulseViewAnimation propData={<LocationIcon theme={Theme} />} />
            </View>
            <View style={Theme.HomeMatchBox.locationButtonBox}>
              <SubButton theme={Theme} language={Lang} title={(isLocation.enabled == PermissionStatus.DENIED || isLocation.enabled == "notEnabled") ? Lang.GENERAL.DEFAULT_GRANT_LOCATION_REQUEST_TEXT : Lang.GENERAL.DEFAULT_GO_TO_DEVICE_LOCATION_PERMISSION_SETTING_TEXT} isWithLoader={isLocation.loading} onAction={() => isLocation.enabled == PermissionStatus.DENIED ? rquestLocationPermission_sub() : handleOpenSettings()} />
            </View>
          </View>

          <View style={Theme.HomeMatchBox.locationTextContainer}>
            <Text numberOfLines={1} style={(isLocation.enabled == PermissionStatus.DENIED || isLocation.enabled == "notEnabled") ? Theme.HomeMatchBox.locationText : Theme.HomeMatchBox.locationTextBlocked} adjustsFontSizeToFit={true} > {(message == "" || message == null) ? Lang.GENERAL.DEFAULT_LOCATION_REQUEST_TEXT : message}</Text>
          </View>

        </View>

      </View>

    </View>

  )

  //Card Deck Loader
  const HomeCardLoader = ({ message = null }: { message?: string }) => (

    <View style={Theme.HomeMatchBox.body}>
      <View style={Theme.HomeMatchBox.bodyContainer}>

        <View style={Theme.HomeMatchBox.loaderView}>
          <View style={Theme.HomeMatchBox.loaderContainer}>
            <LoadIndicator theme={Theme} />
          </View>

          <View style={Theme.HomeMatchBox.loaderTextContainer}>
            <Text numberOfLines={1} style={Theme.HomeMatchBox.loaderText} adjustsFontSizeToFit={true} > {(message == null || message == "") ? Lang.GENERAL.DEFAULT_CARD_LOAD_TEXT : message}</Text>
          </View>

        </View>

      </View>

    </View>
  )

  const GiftItemsViewContent = ({item, currentGiftID} : {item: LoadedGifts, currentGiftID: any}) => {

    const ItemViewCont = ({}) => {

      const [giftIconLoading, setGiftIconLoading] = useState(true);
      return (

            <View style={{
              width: '31.3%',
              height: Dimensions.get('window').width / 3,
              marginLeft: '1%',
              marginRight: '1%',
              paddingBottom: '0.5%',
              backgroundColor: '#1F3A68'
            }}>
      
              <TouchableOpacity
              disabled={
                item.accttype == ACCOUNT_TYPES.BASIC 
                  ? 
                  false 
                  : 
                  ( 
                    item.accttype == ACCOUNT_TYPES.PREMIUM 
                    ? 
                    ( 
                      profile_session.profile_session.accounttype == ACCOUNT_TYPES.PREMIUM 
                        || profile_session.profile_session.accounttype == ACCOUNT_TYPES.VIP 
                      ? 
                      false 
                      : 
                      true
                    ) 
                    : 
                    item.accttype == ACCOUNT_TYPES.VIP 
                    ? 
                    (
                      profile_session.profile_session.accounttype == ACCOUNT_TYPES.VIP 
                      ? 
                      false 
                      : 
                      true
                    ) 
                  : 
                  true
                  
                  )
              }
              style={{
                width: '100%',
                height: '80%',
                backgroundColor:  (
                  item.accttype == ACCOUNT_TYPES.BASIC 
                  ? 
                  (currentGiftID == "" ? '#FFFFFF' : (currentGiftID == item.identifier ? '#1F3A68' : "#FFFFFF")) 
                  : 
                  ( 
                    item.accttype == ACCOUNT_TYPES.PREMIUM 
                    ? 
                    ( 
                      profile_session.profile_session.accounttype == ACCOUNT_TYPES.PREMIUM 
                        || profile_session.profile_session.accounttype == ACCOUNT_TYPES.VIP 
                      ? 
                      (currentGiftID == "" ? '#FFFFFF' : (currentGiftID == item.identifier ? '#1F3A68' : "#FFFFFF")) 
                      : 
                      '#EEEEEE'
                    ) 
                    : 
                    item.accttype == ACCOUNT_TYPES.VIP 
                    ? 
                    (
                      profile_session.profile_session.accounttype == ACCOUNT_TYPES.VIP 
                      ? 
                      (currentGiftID == "" ? '#FFFFFF' : (currentGiftID == item.identifier ? '#1F3A68' : "#FFFFFF")) 
                      : 
                      '#EEEEEE'
                    ) 
                  : 
                  '#EEEEEE'
                  )


                ),
                justifyContent: "center",
                alignItems: "center",
              }}
              
              onPress={()=>{
                setGiftID(item.identifier);
              }}
              >
                  <View style={{
                    width: '100%',
                    height: '80%',
                    backgroundColor: '#1F3A68',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: giftIconLoading == true ? "flex" : "none" 
                  }}>
                      <LoadIndicator theme={Theme} />
                  </View>
                  <Image
                    source={{ uri: ReQUEST_Gift_IMAGE_URL + "/" + item.identifier+"."+item.ext }}
                    style={{
                      width: currentGiftID == "" ? '60%' : (currentGiftID == item.identifier ? '90%' : "60%"),
                      height: currentGiftID == "" ? '60%' : (currentGiftID == item.identifier ? '90%' : "60%"),
                      display: giftIconLoading == false ? "flex" : "none" 
                    }}
                    resizeMode='cover'
                    onLoadEnd={() => setGiftIconLoading(false)}
                  />
      
              </TouchableOpacity>
              <View style={{
                width: '100%',
                height: '20%',
                paddingTop: '0.5%',
              }}>
                  <Text numberOfLines={1} style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontFamily: Theme.GenralComponentColors.FONT1,
                    backgroundColor: '#FFFFFF',
                    color: currentGiftID == "" ? '#1F3A68' : (currentGiftID == item.identifier ? '#00B7EC' : "#1F3A68"),
                    fontSize: 10
                  }}>{item.amount}GC</Text>
              </View>
      
            </View>

      )
    }
    const giftItemRef = useRef<any>(<ItemViewCont/>);

    useEffect(()=>{


      return () => {
        giftItemRef.current = null;
      }
    }, [])



    



  return (giftItemRef.current)

  }

  const giftitemsView = (giftItemsArg : LoadedGifts[], currentGiftID : any) => {

    

    return (

      <FlatList 
      data = {giftItemsArg}
      keyExtractor = {item => item.identifier}
      numColumns = {3}
      columnWrapperStyle={{
        marginTop: '1%',
        marginBottom: '1%'
      }}
      renderItem = {({item, index}) => {


        return (
          <GiftItemsViewContent item={item} currentGiftID={currentGiftID}/>
        )

      }}

      />

      )


  }


  const noGiftItemView = () => {

    return (
      <View><Text>No gift available, work on this view ohh</Text></View>
    )
  }

  const loadingGiftitemView = () => {
    
    return (
      <View><Text>Gift is loading, please show loader here oh</Text></View>
    )
  }

  const GiftContainerView = ({giftedItemArg, giftLoadingArg, currentGiftID} : {giftedItemArg : LoadedGifts[], giftLoadingArg: boolean, currentGiftID: any}) => {


    return (
      <View>
        <View style={{
          width: "100%",
          marginTop: 25
        }}>
        
        {
          giftLoadingArg == true

          ?
          loadingGiftitemView()

          :
          
          (

            giftedItemArg != null && giftedItemArg.length > 0

          ?
          (
            <View style={{
                backgroundColor: '#EEEEEE',
                width: '100%',
                height: '100%',
                padding: '1%'
            }}>

              {giftitemsView(giftedItemArg, currentGiftID)}
              
            </View>
          )
          

          :

          noGiftItemView()

          )


        }
      </View>

    </View>
    )
    
  }









  return (
    <>
    <StatusBar/>
      <View style={Theme.GMHomeScreenStyle.container}>
        <View style={Theme.GMHomeScreenStyle.header}>

          <View style={Theme.GMHomeScreenStyle.headerIconBox}>
            <LogoIcon />
          </View>
          <View style={Theme.GMHomeScreenStyle.menuIconBox}>
            <MenuIcon theme={Theme} actionPressed={() => navigation.openDrawer()} />
          </View>

        </View>

        <View style={Theme.GMHomeScreenStyle.body}>


          <View style={Theme.HomeMatchBox.container}>
            <View style={Theme.HomeMatchBox.header}>
              <Text numberOfLines={1} style={Theme.HomeMatchBox.headerText} adjustsFontSizeToFit={true} >{Lang.GENERAL.EXPLORE}</Text>
              <TouchableOpacity
                style={Theme.HomeMatchBox.headerFilterContainer}

                onPress={ () => {
                  storeTemporaryFilterValue({

                    account: accoountIndex,
                    country: countryIndex,
                    state: stateIndex,
                    gender: genderIndex,
                    genotype: genotypeIndex,
                    agerange: agerangeIndex
  
                  });
                  setModalFilterTitle(Lang.GENERAL.FILTEROPTIONS);
                  setShowModalFilterConfirm(true);
                  setModalFilterConfirmText(Lang.GENERAL.SEARCH);
                  setShowMyModalFilter(true);

                }
              }

              >
                <Text numberOfLines={1} style={Theme.HomeMatchBox.headerFilterContainerText} adjustsFontSizeToFit={true} >{Lang.GENERAL.FILTERICONLABEL}</Text>
                <View style={Theme.HomeMatchBox.headerFilterContainerIconContainer}><FilterIcon theme={Theme} /></View>

              </TouchableOpacity>
            </View>

            {
              isLocation.enabled == true

                ?

                (

                  (isLoading == false && cards != null)

                    ?

                    <SwipeCards
                      ref={(swiper: any) => {
                        setSwiper(swiper);
                      }}
                      cards={cards}
                      renderCard={(cardData: MatchesCardType) => <HomeCardDeck card={cardData} />}
                      keyExtractor={(cardData: MatchesCardType) => String(cardData.key)}
                      renderNoMoreCards={() => <View style={{
                        backgroundColor: "#000000",
                        width: "50%",
                        height: "50%"
                      }}>

                      </View>}

                      actions={{
                        nope: { onAction: handleNope, view: <NopeSwipeDesign /> },
                        yup: { onAction: handleYup, view: <YupSwipeDesign /> },
                        maybe: { onAction: handleGift, view: <GiftSwipeDesign /> },
                      }}


                      smoothTransition={true}
                      hasMaybeAction={true}
                    //stack={true}
                    stackDepth={1}
                    />

                    :

                    <HomeCardLoader message={loadingMessage} />

                )

                :

                <LocationRequestComponent message={isLocation.message} />

            }

          </View>
        </View>
      </View>

      <ModalPopUpBox
      
      theme = {Theme}
      language = {Lang}
      title = {modalFilterTitle}
      content = {<FilterContent/>}
      confirmText = {modalFilterConfirmText}
      confirmAction = {() => filterSearch()}
      closeAction = {()=> filterClose()}
      showConfirm = {showModalFilterConfirm}
      showModal = {showMyModalFilter}
      
      />

    <ModalPopUpBox
        
        theme = {Theme}
        language = {Lang}
        title = {giftFilterTitle}
        content = {<GiftContainerView giftedItemArg={giftItems} giftLoadingArg={giftsLoading} currentGiftID={giftID}/>}
        confirmText = {giftFilterConfirmText}
        confirmAction = {() => sendGift()}
        closeAction = {()=> giftModalClose()}
        showConfirm = {showModalGiftConfirm}
        showModal = {showMyGoftFilter}
        enableContentScrollView = {false}
        
        />

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
  general_session: state.general_session
});

const mapDispatchToProps = (dispatch: any) => ({
  login_session_action: bindActionCreators(changeLoginSession, dispatch),
  profile_session_action: bindActionCreators(changeProfileSession, dispatch),
  general_session_action: bindActionCreators(changeGeneralSession, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GMHome);
