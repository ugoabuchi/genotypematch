import React, { useEffect, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform
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
import { getMatchResults } from '../components/axios';
import { AlertBoxStateParamType, MatchFilterType, NavPropsType, ModalStateType, MatchesCardType, mCard, CardType, buttonParamType } from '../types';
import { BloodBagIcon, FemaleGenderIcon, FilterIcon, GiftIcon, MaleGenderIcon, MenuIcon, NopeIcon, PREMIUMDisplayIcon, VerifiedUser100Icon, VIPDisplayIcon, YupIcon, BASICDisplayIcon, VerifiedUser50Icon, VerifiedUser10Icon, LoadIndicator, PrimaryLoadingIndicator, LocationIcon } from '../components/Icon';
import { PulseViewAnimation } from '../components/Animations';
import { ACCOUNT_TYPES, MATCH_REQUEST_LIMIT, ReQUEST_IMAGE_URL } from '../constants/constants';
import { requestGeoLocationPermission, getGeoLocationPermission, getGeoCoords, getGeoCoordsLocationDetails } from '../components/locationManager';
import SwipeCards from 'react-native-swipe-cards-deck';
import { SubButton } from '../components/Button';
import { PermissionStatus } from 'expo-location';
import StatusBar from '../components/Statusbar';
import { ModalPopUpBox } from '../components/Modal';

const GMHome = ({ navigation, route, login_session, profile_session, general_session, login_session_action, profile_session_action, general_session_action }: NavPropsType) => {

  const Theme = general_session.general_session.theme_mode;
  const Lang = general_session.general_session.Language;

  //set useref for allocated background intervals

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

  const [modalFilterTitle, setModalFilterTitle] = useState<string>(null);

  const [showMyModalFilter, setShowMyModalFilter] = useState<boolean>(false);

  const [showModalFilterConfirm, setShowModalFilterConfirm] = useState<boolean>(true);

  const [modalFilterConfirmText, setModalFilterConfirmText] = useState<string>(null);

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
    BackHandler.addEventListener("hardwareBackPress", () => {
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




    //update permission state
    getGeoLocationPermission_sub()

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
      if(genotypeIndex != 7 || accoountIndex != 4)
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
      if(countryIndex != countryDefaultIndex || stateIndex != countryStateDefaultIndex || genderIndex != 3 || genotypeIndex != 7 || accoountIndex != 4 || agerangeIndex != 7)
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

   }
   else
   {

    await getGeoLocationPermission_sub();

   if(isLocation.enabled == true)
   {
      //get Location coords
      const coords = await getGeoCoords();
      if(coords)
      {
      //set and send request to server
      //send to API Server

      const reverseCoords = await getGeoCoordsLocationDetails(coords);
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

          setCard([]);
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
      }

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
      
      //const APP_REQUEST_API = await getMatchResults(params, Lang);
      

        setCard([
          {key: 0, id: "0", name: "Mathew Fortune", gender: "Male", lastseencountry: "NG", lastseencity: "Lagos", lastseencoords: "8.5894BLARK6.9758", distance: "400", dob: "1985-12-09", description: "We getting the ball rolling", blooggroup: "CC", accounttype: "Basic", url: "test.png", pverified: "true", bverified:"true", online: "true"},
          {key: 1, id: "1", name: "Angela Jones", gender: "Female", lastseencountry: "US", lastseencity: "Ohio", lastseencoords: "8.5894BLARK6.9758", distance: "400", dob: "1985-12-09", description: "We getting the ball rolling", blooggroup: "CC", accounttype: "Basic", url: "test1.png", pverified: "true", bverified:"false", online: "false"},
          {key: 2, id: "2", name: "Divine Adaugo", gender: "Male", lastseencountry: "GH", lastseencity: "Kumasi", lastseencoords: "8.5894BLARK6.9758", distance: "10", dob: "1980-09-10", description: "Gotch you right there, serios people only", blooggroup: "AA", accounttype: "VIP", url: "test.png", pverified: "true", bverified:"true", online: "true"},
          {key: 3, id: "3", name: "Kingsely Pius", gender: "Male", lastseencountry: "NG", lastseencity: "Lagos", lastseencoords: "8.5894BLARK6.9758", distance: "20", dob: "1999-02-01", description: "bla bla bla bla bla bla bla bla", blooggroup: "SS", accounttype: "Basic", url: "test1.png", pverified: "true", bverified:"false", online: "false"},
          
        ]);
        
      }


      

      }
      else
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

      setCard([]);
      }
    //empty card should be repreented with [] and not null, so that the background location checker would not mess with data fetching
    //set default to empty card
    //setCard([]);
    

    //fetch card
    /*setCard([
      { key: 0, id: 0, name: "Mathew Fortune", gender: "Male", locationcode: "105.112.154.62blarkNigeriablarkNGblarkhttps:\/\/cdn.ipwhois.io\/flags\/ng.svgblarkLagosblark6.5243793blark3.3792057", distance: "20", dob: "1996-26-12", description: "Just a disction about me", blooggroup: "AS", accounttype: "Premium", url: "xxx.jpg", pverified: "true", bverified: "true", isOnline: "true" },
      { key: 1, id: 1, name: "Angela Jones", gender: "Female", locationcode: "105.112.154.62blarkUSAblarkUSblarkhttps:\/\/cdn.ipwhois.io\/flags\/us.svgblarkDenverblark6.5243793blark3.3792057", distance: "400", dob: "1985-12-09", description: "We getting the ball rolling", blooggroup: "CC", accounttype: "Basic", url: "test.png", pverified: "true", bverified: "false", isOnline: "false" },
      { key: 2, id: 2, name: "Divine Adaugo", gender: "Male", locationcode: "105.112.154.62blarkCanadablarkCAblarkhttps:\/\/cdn.ipwhois.io\/flags\/ca.svgblarkTorontoblark6.5243793blark3.3792057", distance: "10", dob: "1980-09-10", description: "Gotch you right there, serios people only", blooggroup: "AA", accounttype: "VIP", url: "test1.png", pverified: "true", bverified: "true", isOnline: "true" },
      { key: 3, id: 3, name: "Kingsely Pius", gender: "Male", locationcode: "105.112.154.62blarkGhanablarkGHblarkhttps:\/\/cdn.ipwhois.io\/flags\/gh.svgblarkAccrablark6.5243793blark3.3792057", distance: "20", dob: "1999-02-01", description: "bla bla bla bla bla bla bla bla", blooggroup: "SS", accounttype: "Basic", url: "test.png", pverified: "true", bverified: "false", isOnline: "false" },

    ]);
    */
    
    

   }
   else
   {

    //update location states params
    rquestLocationPermission_sub();
    
   }


   }



   
   setIsLoading(false);
    
   

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

  //hold previous temp filter values when in filter menu
  const storeTemporaryFilterValue = (previouaFilter: MatchFilterType) => {
    setTemporaryFilterValues(previouaFilter);
  }



  const handleYup = (currentCard: MatchesCardType) => {

    return true;

  }

  const handleNope = (currentCard: MatchesCardType) => {

    return true;

  }

  const handleGift = (currentCard: MatchesCardType) => {

    return true;

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
      }}>Like</Text>
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
