import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  BackHandler,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  changeLoginSession,
  changeProfileSession,
  changeGeneralSession
} from '../redux/actions/Session';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoIcon } from '../components/logo';
import StatusBar from '../components/Statusbar';
import { Image } from "react-native";
import { Badge } from 'react-native-paper';
import { getAge, getCountryByIndex, getFileBase64FromURL, isLoggedIn, SvgImager } from '../components/common';
import { MyAlert, MyModal } from '../components/PopUp';
import { AccountListDropDown, AgeListDropDown, CountryListDropDown, CountryStateListDropDown, GenderListDropDown, GenotypeListDropDown } from '../components/ListDropDown';
import { getMatchResults } from '../components/axios';
import { AlertBoxStateParamType, MatchFilterType, NavPropsType, ModalStateType, MatchesCardType, mCard, CardType, buttonParamType } from '../types';
import { BloodBagIcon, FemaleGenderIcon, FilterIcon, GiftIcon, MaleGenderIcon, MenuIcon, NopeIcon, PREMIUMDisplayIcon, VerifiedUser100Icon, VIPDisplayIcon, YupIcon, BASICDisplayIcon, VerifiedUser50Icon, VerifiedUser10Icon, LoadIndicator, PrimaryLoadingIndicator, LocationIcon } from '../components/Icon';
import { PulseViewAnimation } from '../components/Animations';
import { BLOCKED_RESPONSE, ReQUEST_IMAGE_URL } from '../constants/constants';
import SwipeCards from 'react-native-swipe-cards-deck';
import { SubButton } from '../components/Button';
const GMHome = ({ navigation, route, login_session, profile_session, general_session, login_session_action, profile_session_action, general_session_action }: NavPropsType) => {

  const Theme = general_session.general_session.theme_mode;
  const Lang = general_session.general_session.Language;

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

  const [filterValues, setFilterValues] = useState<MatchFilterType>({
    account: 0,
    country: 0,
    state: 0,
    gender: 0,
    genotype: 0,
    agerange: 0

  })

  const [temporaryFilterValues, setTemporaryFilterValues] = useState<MatchFilterType>({
    account: 0,
    country: 0,
    state: 0,
    gender: 0,
    genotype: 0,
    agerange: 0

  })

  const [modalState, setModalState] = useState<ModalStateType>({
    title: null,
    confirmText: null,
    confirmAction: null,
    initialOpenAction: null,
    showModal: false
  })

  const [cards, setCard] = useState<MatchesCardType[]>(null);

  const [swiper, setSwiper] = useState<any>({ swipeYup: () => { }, swipeNope: () => { }, swipeMaybe: () => { } });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loadingMessage, setLoadingMessage] = useState<string>(null);

  const [isLocation, setisLocation] = useState<{
    enabled: boolean | string,
    loading: buttonParamType,
    message: string
  }>({
    enabled: false,
    message: null,
    loading: {
      isLoader: true,
      showLoader: false
    }
  });
  //lets diable saving to local for now until we done with designs, in redux


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


    //loadInitializers();


  }, [])

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

  const loadMatches = async () => {
    setCard([
      { key: 0, id: 0, name: "Mathew Fortune", gender: "Male", locationcode: "105.112.154.62blarkNigeriablarkNGblarkhttps:\/\/cdn.ipwhois.io\/flags\/ng.svgblarkLagosblark6.5243793blark3.3792057", distance: "20", dob: "1996-26-12", description: "Just a disction about me", blooggroup: "AS", accounttype: "Premium", url: "xxx.jpg", pverified: "true", bverified: "true", isOnline: "true" },
      { key: 1, id: 1, name: "Angela Jones", gender: "Female", locationcode: "105.112.154.62blarkUSAblarkUSblarkhttps:\/\/cdn.ipwhois.io\/flags\/us.svgblarkDenverblark6.5243793blark3.3792057", distance: "400", dob: "1985-12-09", description: "We getting the ball rolling", blooggroup: "CC", accounttype: "Basic", url: "test.png", pverified: "true", bverified: "false", isOnline: "false" },
      { key: 2, id: 2, name: "Divine Adaugo", gender: "Male", locationcode: "105.112.154.62blarkCanadablarkCAblarkhttps:\/\/cdn.ipwhois.io\/flags\/ca.svgblarkTorontoblark6.5243793blark3.3792057", distance: "10", dob: "1980-09-10", description: "Gotch you right there, serios people only", blooggroup: "AA", accounttype: "VIP", url: "test1.png", pverified: "true", bverified: "true", isOnline: "true" },
      { key: 3, id: 3, name: "Kingsely Pius", gender: "Male", locationcode: "105.112.154.62blarkGhanablarkGHblarkhttps:\/\/cdn.ipwhois.io\/flags\/gh.svgblarkAccrablark6.5243793blark3.3792057", distance: "20", dob: "1999-02-01", description: "bla bla bla bla bla bla bla bla", blooggroup: "SS", accounttype: "Basic", url: "test.png", pverified: "true", bverified: "false", isOnline: "false" },

    ])
  }
  const loadInitializers = async () => {

    console.log("what")
    //check if location is enabled
    /*if (isLocation.enabled == false || isLocation.enabled == BLOCKED_RESPONSE) {
      setisLocation({
        ...isLocation,
        loading: {
          ...isLocation.loading,
          showLoader: false
        }
      });

       checkGeoLocationPermission((enabledValue) => {
         setisLocation({
           ...isLocation,
           enabled: enabledValue,
           message: enabledValue != BLOCKED_RESPONSE ? null : Lang.GENERAL.DEFAULT_LOCATION_BLOCKED_OR_UNAVAILABLE_TEXT,
           loading: {
             ...isLocation.loading,
             showLoader: false
           }
         });
       });

  }
*/


  }


  const getGeoLocationPermission = async () => {
    console.log("hi")
    //request location permission
    /*if (isLocation.enabled == false || isLocation.enabled == BLOCKED_RESPONSE) {
      setisLocation({
        ...isLocation,
        loading: {
          ...isLocation.loading,
          showLoader: true
        }
      });
  
      requestGeoLocationPermission((enabledValue) => {
  
        setisLocation({
          ...isLocation,
          enabled: enabledValue,
          message: enabledValue != BLOCKED_RESPONSE ? null : Lang.GENERAL.DEFAULT_LOCATION_BLOCKED_OR_UNAVAILABLE_TEXT,
          loading: {
            ...isLocation.loading,
            showLoader: false
          }
        });
  
      });
  
    }
    */


  }

  useEffect(() => {
    if (isLocation.enabled == true) {
      loadMatches();
    }
    else if (isLocation.enabled == BLOCKED_RESPONSE) {
      setAlertBox({
        ...alertBox,
        alertType: "error",
        title: null,
        message: Lang.GENERAL.LOCATION_BLOCKED_OR_UNAVAILABLE_FIX_ERROR_TEXT,
        cancelText: Lang.GENERAL.OK,
        showConfirm: false,
        showAlert: true,
        cancelAction: () => cancelAlert(),
      })
    }
  }, [isLocation])
  //set Account
  const setAccount = (index: any) => {
    setFilterValues({
      ...filterValues,
      account: index
    })
  }

  //set Age range
  const setAgeRange = (index: any) => {
    setFilterValues({
      ...filterValues,
      agerange: index
    })
  }

  //set Genotype
  const setGenotype = (index: any) => {
    setFilterValues({
      ...filterValues,
      genotype: index
    })
  }

  //set Country Code
  const setCountry = (index: number) => {
    setFilterValues({
      ...filterValues,
      country: index,
      state: 0
    })
  }

  //set Country State
  const setCountryState = (index: number) => {
    setFilterValues({
      ...filterValues,
      state: index
    })
  }

  //set Gender
  const setGender = (index: any) => {
    setFilterValues({
      ...filterValues,
      gender: index
    })
  }

  //Filter Search Action
  const filterSearch = () => {
    setModalState({
      ...modalState,
      showModal: false
    })

    //Perform filter search operations
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
            defaultIndex={filterValues.account}
            language={Lang}
            yourCallBack={(index) => { setAccount(index) }}
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
            defaultIndex={filterValues.country}
            language={Lang}
            yourCallBack={(index) => { setCountry(index) }}
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
            countryCode={getCountryByIndex(filterValues.country).code}
            defaultIndex={filterValues.state}
            language={Lang}
            yourCallBack={(index) => { setCountryState(index) }}
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
            defaultIndex={filterValues.gender}
            language={Lang}
            yourCallBack={(index) => { setGender(index) }}
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
            defaultIndex={filterValues.genotype}
            language={Lang}
            yourCallBack={(index) => { setGenotype(index) }}
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
            defaultIndex={filterValues.agerange}
            language={Lang}
            yourCallBack={(index) => { setAgeRange(index) }}
          />

        </View>
      </View>

    </View>


  )


  //Card Deck Component
  const HomeCardDeck = ({ card }: CardType) => {

    const [profileImageSrc, setprofileImageSrc] = useState(null);
    const [countryImageSrc, setCountryImageSrc] = useState(null);
    const [imagesLoading, setImagesLoading] = useState<{
      profileImage: boolean,
      countryIcon: boolean
    }>({
      profileImage: true,
      countryIcon: true
    });


    useEffect(() => {

      async function loadStaticleImages() {


        getFileBase64FromURL(ReQUEST_IMAGE_URL + "/" + card.url, (base64String) => {
          setCountryImageSrc((card.locationcode.split("blark"))[3]);
          setprofileImageSrc(`data:image/png;base64,${base64String}`);
          setImagesLoading({
            ...imagesLoading,
            profileImage: false,
            countryIcon: false
          });
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
                  imagesLoading.countryIcon == true
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


              <View style={imagesLoading.profileImage == true ? Theme.HomeMatchBox.bc1c2child1 : Theme.HomeMatchBox.bc1c2childContainer}>
                {
                  imagesLoading.profileImage == true
                    ?
                    (
                      <LoadIndicator theme={Theme} />
                    )
                    :
                    (
                      <Image
                        source={{ uri: profileImageSrc }}
                        style={Theme.HomeMatchBox.bc1c2childContainerImage}
                        resizeMode='cover'
                      />

                    )
                }
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
                  <Text numberOfLines={1} style={Theme.HomeMatchBox.bc2c1c2child2Text}>{(card.locationcode.split("blark"))[4] + ", " + (card.locationcode.split("blark"))[2] + " - " + card.distance + Lang.GENERAL.KMAWAY}</Text>
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
              <SubButton theme={Theme} language={Lang} title={Lang.GENERAL.DEFAULT_GRANT_LOCATION_REQUEST_TEXT} isWithLoader={isLocation.loading} onAction={() => getGeoLocationPermission()} />
            </View>
          </View>

          <View style={Theme.HomeMatchBox.locationTextContainer}>
            <Text numberOfLines={1} style={message == Lang.GENERAL.DEFAULT_LOCATION_BLOCKED_OR_UNAVAILABLE_TEXT ? Theme.HomeMatchBox.locationTextBlocked : Theme.HomeMatchBox.locationText} adjustsFontSizeToFit={true} > {(message == "" || message == null) ? Lang.GENERAL.DEFAULT_LOCATION_REQUEST_TEXT : message}</Text>
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

                onPress={() => setModalState({ ...modalState, title: Lang.GENERAL.FILTEROPTIONS, confirmText: Lang.GENERAL.SEARCH, confirmAction: () => filterSearch(), initialOpenAction: () => storeTemporaryFilterValue(filterValues), showModal: true })}

              >
                <Text numberOfLines={1} style={Theme.HomeMatchBox.headerFilterContainerText} adjustsFontSizeToFit={true} >{Lang.GENERAL.FILTERICONLABEL}</Text>
                <View style={Theme.HomeMatchBox.headerFilterContainerIconContainer}><FilterIcon theme={Theme} /></View>

              </TouchableOpacity>
            </View>

            {
              isLocation.enabled == true

                ?

                (

                  (cards != null && cards.length > 0)

                    ?

                    <SwipeCards
                      ref={(swiper: any) => {
                        setSwiper(swiper);
                      }}
                      cards={cards}
                      renderCard={(cardData: MatchesCardType) => <HomeCardDeck card={cardData} />}
                      keyExtractor={(cardData: MatchesCardType) => String(cardData.key)}
                      renderNoMoreCards={() => <></>}

                      actions={{
                        nope: { onAction: handleNope, view: <NopeSwipeDesign /> },
                        yup: { onAction: handleYup, view: <YupSwipeDesign /> },
                        maybe: { onAction: handleGift, view: <GiftSwipeDesign /> },
                      }}


                      smoothTransition={true}
                      hasMaybeAction={true}
                    //stack={true}
                    //stackDepth={2}
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
      <MyModal
        theme={Theme}
        language={Lang}
        title={modalState.title}
        confirmText={modalState.confirmText}
        confirmAction={modalState.confirmAction}
        showModal={modalState.showModal}
        closeAction={() => { setModalState({ ...modalState, showModal: false }); setFilterValues(temporaryFilterValues); }}
        initialOpenAction={modalState.initialOpenAction}
        content={<FilterContent />}
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
