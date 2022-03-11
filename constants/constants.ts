//import Constants from "expo-constants";
import { reduxStoreLocalKeyType } from "../types";

//const { manifest } = Constants;
//const EXPO_UNDERLAY_SERVER_LINK = `http://${manifest.debuggerHost.split(':').shift()}:19000`;

export const COPYRIGHTS = {
  vendor: "TECKOPS LTD",
  vendorsUrl: "HTTPS:TECKOPS.COM",
  vendorsContactEmail: "INFO@TECKOPS.COM",
  offer: "CONTRACTED",
  type: "MOBILE",
  platform: "CROSS-PLATFORM",
  appKey: "CHrS3%hk@roLOppGgRRRw",
  renderedTo: "DIGITATE SOLUTIONS",
  project: {
    title: "GENOTYPE MATCH",
    category: "DATING",
    description: "DATING APP",
    goal: "BETTER EXPERIENCE MODEL USING USE'S GENOTYPE AS A MEANS TO BUILD SAFETY AND BOOST THE INTEREST OF USERS TOWARDS POSITIVITY OR OUTCOME",
    duration: "5 MONTHS",
    firstReleaseDate: "20th, December, 2020",
    founder: "KINGSLEY PIUS"
  }
}
export const MAIN_URL = "http://10.0.2.2/genotypematch-web/";
//export const MAIN_URL = EXPO_UNDERLAY_SERVER_LINK+"/genotypematch-web/";
export const ReQUEST_URL = MAIN_URL + "API_REQUEST";
export const ReQUEST_IMAGE_URL = MAIN_URL + "webapp/File_Uploads/Gallery/Images";
export const AXIOS_HEADER_CONFIG = {
  headers: {
    'Content-Type': "application/x-www-form-urlencoded"
  }
}

export const GOOGLE_API_KEY = "AIzaSyBAljLE1KLCXbLJpnJS8_V2ZplzrbrDs68";
export const STATUSBAR = true;

export const API_RESPONSE = {
  GENERAL: {
    INSECURENETWORK: "error-insecure-connection",
    USERNAMEORACTIONNULL: "error-null-username-or-action",
    NULLPASSWORD: "error-passkey-null",
    ACTIONFALSE: "error-action-false",
    TOKENFALSE: "error-token-false",
    USERNAMEREGEXFALSE: "error-username-regex-false",
    PASSKEYREGEXFALSE: "error-password-regex-false",
    USERNAMEEXISTTRUE: "username-exist-true",
    USERNAMEEXISTFALSE: "username-exist-false",
    PASSKEYTRUE: "error-passkey-true",
    PASSKEYFALSE: "error-passkey-false"
  },
  LOGIN: {
    SUCCESS: true,
    NOTVERIFIED: "error-account-unverified",
    NOTENABLED: "error-account-disabled"
  },
  REGISTER: {
    SUCCESS: true,
  },
  MATCHES: {
    SUCCESS: true,
    INVALIDPARAMS: "error-invalid-request-params",
    INVALIDACCOUNTTYPE: "invalid-account-selection-type"
  },
  YUP: {
    SUCCESS: true,
    ALREADYLIKED: "already-liked",
    INVALIDMATCHUSER: "invalid-match-user"
  },
}

export const APP_RESPONSE = {

  GENERAL: {
    NONETWORK: "network-unavailable",
    INSECURENETWORK: "insecure-connection",
    ACTIONFALSE: "action-false",
    TOKENFALSE: "token-false",
    USERNAMEORACTIONNULL: "username-or-action-is-null",
    NULLPASSWORD: "password-null",
    USERNAMEREGEXFALSE: "username-regex-false",
    PASSKEYREGEXFALSE: "password-regex-false",
    SERVER: "server",
    USERNAMEAVAILABLE: "username-available",
    USERNAMENOTAVAILABLE: "username-unavailable",
    PASSKEYTRUE: "passkey-accepted",
    PASSKEYFALSE: "passkey-rejected"
  },
  LOGIN: {
    SUCCESS: "signed-in",
    NOTVERIFIED: "account-unverified",
    NOTENABLED: "account-disabled"
  },
  REGISTER: {
    SUCCESS: "signed-up"
  },
  MATCHES: {
    SUCCESS: "match-found",
    INVALIDPARAMS: "invalid-request-params",
    INVALIDACCOUNTTYPE: "account-selection-type-error"
  },
  YUP: {
    SUCCESS: "yup-success",
    ALREADYLIKED: "yup-exist",
    INVALIDMATCHUSER: "match-user-invalid"
  },
}

export const SPLASH_SCREEN_TIMEOUT = 3;  // in seconds

export const TOAST_INTERVAL_ID = 1;

export const MIN_AGE = 18;

export const MAX_AGE = 74;

export const MATCH_REQUEST_LIMIT = 10;

export const TIME_INTERVAL_BEFORE_NEW_EMAIL_VERIFICATION_CODE_REQUEST = 60;  // in seconds

export const TIME_INTERVAL_BEFORE_NEW_AUTO_REQUEST = 5000;  // in mills

export const REDUX_SESSION_LOCAL_STORE_KEYS = {
  login_session: <reduxStoreLocalKeyType>("login_local_session"),
  profile_session: <reduxStoreLocalKeyType>("profile_local_session"),
  general_session: <reduxStoreLocalKeyType>("general_local_session")
};

export const GENDER_LIST = [
  "ALL",
  "Male",
  "Female",
  "Random"
];

export const ACCOUNT_TYPES = {
  ALL: "ALL",
  BASIC: "Basic",
  PREMIUM: "Premium",
  VIP: "VIP",
  RANDOM: "Random"
};

export const GENOTYPE_LIST = {
  ALL: "ALL",
  AA: "AA",
  AS: "AS",
  AC: "AC",
  SS: "SS",
  SC: "SC",
  CC: "CC",
  RANDOM: "Random"
};

export const AGERANGE_LIST = {
  ALL: "ALL",
  ONE: "18 to 24",
  TWO: "25 to 34",
  THREE: "35 to 44",
  FOUR: "45 to 54",
  FIVE: "55 to 64",
  SIX: "65 to 74",
  SEVEN: "18 to 74",
  RANDOM: "Random"
}

export const GM_NOTIFICATION = {
  YUP_USER_SUCESS: "yup-user-success",
  USER_MATCH_SUCCESS: "user-match-success",
  YUP_ALREADY_SUCCESS: "yup-already-liked",
  YUP_INVALID_MATCH_USER: "yup-invalid-match-user",
  GIFT_USER_SUCCESS: "gift-user-success",
  GIFT_INSUFFICIENT_GC: "gift-insufficient-gc",
  GIFT_SELECTED_GIFT_ITEM_UNAVAILABLE: "gift-selected-gift-item-unavailable",
  GIFT_INVALID_MATCH_USER: "gift-Invalid-match-user",
  CHAT_MESSAGE_RECIEVED: "chat-message-recieved",
  CHAT_MESSAGE_ERROR: "chat-message-error",
  ADMIN_MESSAGE_RECIEVED: "admin-message-recieved",

};

//Old updates

export const DEFAULT_LOCATION = {
  country: "US",
  stateIndex: 0
}



export const DEFAULT_AGE_RANGE = [
  "ALL",
  "18 to 24",
  "25 to 34",
  "35 to 44",
  "45 to 54",
  "55 to 64",
  "65 to 74",
  "Random"
]

export const DEFAULT_NO_OF_MATCHES_PER_REQUEST = 20;
export const DEFAULT_PASSCODE = "ugoabuchi2021123textdio88AAbbb";
