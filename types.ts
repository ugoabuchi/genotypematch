import { CountryCode } from "react-native-country-picker-modal";

export type GeneralSessionType = {

  general_session: {

    initialAppLoad: boolean,
    prevLoginUser: string,
    FirstTimeAppLogin: boolean,
    Language: any,
    lastLogError: string,
    theme_mode: any,
    storeLocalData: boolean,
    bearer: string,
    settings: {
      statusBar: boolean,
            fingerprint: boolean,
            notification: {
                background: boolean,
                style : "slide" | "popup",
                messages: boolean,
                likes: boolean,
                gifts: boolean,
                profile: boolean,
                upgrades: boolean,
                payments: boolean,
                general: boolean,
            }
    }

  };

}

export type LoginSessionType = {

  login_session: boolean;

}

export type ProfileSessionType = {

  profile_session: any;

}

export type LoginSessionActionType = (value: any, storeData: storeLocalyType) => any;

export type ProfileSessionActionType = (value: any, storeData: storeLocalyType) => any;

export type GeneralSessionActionType = (value: any, storeData: storeLocalyType) => any;

export type NavPropsType = {

  navigation: any;
  route?: any;
  login_session?: LoginSessionType;
  profile_session?: ProfileSessionType;
  general_session?: GeneralSessionType;
  login_session_action?: LoginSessionActionType;
  profile_session_action?: ProfileSessionActionType;
  general_session_action?: GeneralSessionActionType;

}

export type StyleTransparentType = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 85 | 90 | 92 | 94 | 96 | 98;

export type buttonParamType = {

  isLoader: boolean,
  onLoadingText?: string,
  showLoader: boolean

}

export type MainButtonTtype = {

  theme: any;
  language: any;
  title?: string;
  onAction?: () => void;
  isWithLoader?: buttonParamType

}

export type StatusBarType = {
  hidden?: boolean;

}

export type FormInputBoxType = {

  theme: any;
  language: any;
  useCase?: useCaseForSession;
  onEdit?: (input: string | null) => void;
  placeholder?: string | null;
  defaultvalue?: any;
  editable?: boolean;

}

export type APIResponse = {

  response: string;
  message: string;
  data?: any;

}

export type ServerResponse = {

  response: boolean | string;
  data?: any;
  message?: any;

}

export type ValidatorResponse = {

  response: string;
  responsetext?: string | null;

}
export type useCaseForSession = "signin" | "signup";

export type LoginParamType = {

  username: string;
  password: string;

}
export type LoginParamStateType = {

  username: string;
  password: string;
  editable: boolean;

}
export type AlertTypes = "success" | "error" | "warning" | "normal";

export type AlertBoxParamType = {

  theme: any;
  language: any;
  alertType: AlertTypes;
  showAlert: boolean;
  title: string;
  message: string;
  cancelText: string;
  cancelAction: () => void;
  showConfirm?: boolean;
  confirmText?: string;
  confirmAction?: () => void;

}

export type ModalBoxParamType = {

  theme: any;
  language: any;
  showModal: boolean;
  title?: string;
  content: JSX.Element;
  confirmText?: string;
  confirmAction?: () => void
  closeAction: () => void;

}

export type ModalViewTPopUp = {
  theme: any;
  language: any;
  title: string, 
  content: JSX.Element;
  confirmText: string;
  confirmAction: ()=>void;
  closeAction: ()=>void;
}

export type MyModalType = {

  theme: any;
  showAlert: boolean;
  customView: JSX.Element;

}


export type MyModalViewType = {

  theme: any;
  language: any;
  title?: string;
  content: JSX.Element;
  showModal: boolean;
  confirmText?: string;
  confirmAction?: () => void
  closeAction: () => void;

}


export type AlertBoxStateParamType = {

  alertType: AlertTypes;
  showAlert: boolean;
  title: string;
  message: string;
  cancelText: string;
  cancelAction: () => void;
  showConfirm?: boolean;
  confirmText?: string;
  confirmAction?: () => void;

}

export type ToastBoxParamType = {

  theme: any;
  language: any;
  toastType: AlertTypes;
  showToast: boolean;
  closeToastAction: any;
  message: string;
}

export type ToastBoxStateType = {
  toastType: AlertTypes;
  message: string;
  show: boolean;

}

export type ModalPopUp = {
  theme: any;
  language: any;
  title: string;
  showModal: boolean; 
  content: JSX.Element;
  showConfirm?: boolean;
  confirmText?: string;
  confirmAction?: () => void;
  closeAction: () => void;
}
export type PulseAnimationType = {

  propData: {},
  viewStyle?: StyleSheet

}

export type IsLoggedInType = {

  login_session: LoginSessionType;
  mandate: boolean;
  yourCallBack?: (() => void) | null

}

export type StartUpHeaderConfigType = {

  login_session: LoginSessionType;
  profile_session: ProfileSessionType;
  general_session: GeneralSessionType;
  login_session_action: LoginSessionActionType;
  profile_session_action: ProfileSessionActionType;
  general_session_action: GeneralSessionActionType;
  notifyBeforeBackHandler?: boolean;
  backScreenDispatch: () => void
  yourCallBack?: (() => void) | null;
  setTimer?: number;

}

export type logOutType = {

  login_session: LoginSessionType;
  general_session: GeneralSessionType;
  login_session_action: LoginSessionActionType;

}

export type localDataSaveAsyncType = {

  key: string;
  valueinJson: any;
  yourCallBack?: (error: Error) => void

}

export type localDataRetrieveAsyncType = {

  key: string;
  yourCallBack: (error: Error, result: any) => void

}

export type localDataMergeAsyncType = {

  key: string;
  valueinJson: any;
  yourCallBack?: (error: Error) => void

}

export type localDataRemoveAsyncType = {

  key: string;
  yourCallBack?: (error: Error) => void

}

export type reduxStoreLocalKeyType = "login_local_session" | "profile_local_session" | "general_local_session";

export type storeLocalyType = {

  allow: boolean;
  key: reduxStoreLocalKeyType;

}

export type countryListParamType = {
  theme: any,
  defaultValue: CountryCode | null;
  showCountry?: boolean;
  yourCallBack: (value: CountryCode) => void;
}

export type ListDropDownParamType = {
  theme: any;
  language: any
  defaultIndex?: number;
  yourCallBack: (value: any) => void;
}

export type StateListDropDownParamType = {
  theme: any;
  language?: any;
  countryCode: string;
  defaultIndex?: number;
  yourCallBack: (value: any) => void;
}

export type DropdownListParamType = {
  theme: any;
  items: any[];
  countryCode: string;
  defaultIndex?: number;
  yourCallBack: (value: any) => void;
}

export type accountListType = "ALL" | "Basic" | "Premium" | "VIP";

export type genderListType = "ALL" | "Male" | "Female" | "Random";

export type genotypeListType = 'AA' | 'AS' | 'AC' | 'SS' | 'SC' | 'CC' | "Random";

export type ageRangeListType = "ALL" | "18 to 24" | "25 to 34" | "35 to 44" | "45 to 54" | "55 to 64" | "65 to 74" | "18 to 74" | "Random";

export type MatchFilterType = {
  account: number;
  country: number;
  state: number;
  gender: number;
  genotype: number;
  agerange: number;
}


export type ModalStateType = {
  title: string;
  confirmText: string;
  confirmAction: () => void;
  closeAction: () => void;
  showModal: boolean;
  content: JSX.Element
}


export type MatchesCardType = {
  key: number;
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  dob: string;
  blooggroup: 'AA' | 'AS' | 'AC' | 'SS' | 'SC' | 'CC';
  description: string;
  url: string;
  accounttype: 'Basic' | 'Premium' | 'VIP';
  lastseencountry: string;
  lastseencity: string;
  lastseencoords: string;
  distance: string;
  pverified: 'true' | 'false';
  bverified: 'true' | 'false';
  online: 'true' | 'false';
}

export type CardType = {
  card: MatchesCardType
}













//Old Updates



export type CardItemT = {
  description?: string;
  hasActions?: boolean;
  hasVariant?: boolean;
  image: any;
  isOnline?: boolean;
  matches?: string;
  name: string;
};

export type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export type IconComponentT = {
  theme: any;
  actionPressed?: () => void;
};

export type MessageT = {
  image: any;
  lastMessage: string;
  name: string;
};

export type ProfileItemT = {
  age?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: string;
  matches: string;
  name: string;
};

export type TabBarIconT = {
  focused: boolean;
  iconName: any;
  text: string;
};

export type DataT = {
  id: number;
  name: string;
  isOnline: boolean;
  match: string;
  description: string;
  message: string;
  image: any;
  age?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: string;
};

export type RegisterT = {
  navigation: any;
}

export type ActionT = {
  action: any;
  payload: any;
  type: any;
}

export type ReduxSession = {
  session: any;
}

export type UsertT = {
  id?: string;
  name: string;
  username?: string;
  email: string;
  gender: 'Male' | 'Female' | 'Others';
  country: CountryCode;
  phone?: string;
  genotype?: 'AA' | 'AS' | 'AC' | 'SS' | 'SC' | 'CC';
  relation_status?: 'Single' | 'Married' | 'Divorced' | 'Widow' | 'Widower' | 'Separated' | 'Complicated' | 'Private';
  interested?: 'Male' | 'Female' | 'Others';
  description?: string;
  url?: string;
}

export type mCard = {
  key: number;
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  locationcode: string;
  distance: string;
  dob: string;
  blooggroup: 'AA' | 'AS' | 'AC' | 'SS' | 'SC' | 'CC';
  description: string;
  url: string;
  accounttype: 'Normal' | 'Premium' | 'VIP';
  pverified: 'true' | 'false';
  bverified: 'true' | 'false';
  isOnline: 'true' | 'false';
}

export type genotypeDataType = 'AA' | 'AS' | 'AC' | 'SS' | 'SC' | 'CC';

export type genderDataType = 'Male' | 'Female';



