import axios  from 'axios';
import {AXIOS_HEADER_CONFIG, ReQUEST_URL, API_RESPONSE, APP_RESPONSE} from '../constants/constants';
import { APIResponse, ServerResponse, useCaseForSession } from '../types';
//fix general token check

//new
const loginUser = async (params: URLSearchParams, language: any): Promise<APIResponse> => {
  params.append('action', 'login');

  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    const userData: ServerResponse = user.data;
          if(userData.response == API_RESPONSE.LOGIN.SUCCESS)
          {
              return {
              response: APP_RESPONSE.LOGIN.SUCCESS,
              message: language.GENERAL.RESPONSE.LOGIN.SUCCESS,
              data: userData.data
              }
          }
          else if(userData.response == API_RESPONSE.GENERAL.USERNAMEEXISTFALSE)
          {
              return {
              response: APP_RESPONSE.GENERAL.USERNAMENOTAVAILABLE,
              message: language.GENERAL.RESPONSE.LOGIN.USERNAMENOTAVAILABLE
              }
          }
          else if(userData.response == API_RESPONSE.GENERAL.PASSKEYFALSE)
          {
              return {
              response: APP_RESPONSE.GENERAL.PASSKEYFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.PASSKEYFALSE
              }
          }
          else if(userData.response == API_RESPONSE.LOGIN.NOTENABLED)
          {
              return {
              response: APP_RESPONSE.LOGIN.NOTENABLED,
              message: language.GENERAL.RESPONSE.LOGIN.NOTENABLED
              }
          }
          else if(userData.response == API_RESPONSE.LOGIN.NOTVERIFIED)
          {
              return {
              response: APP_RESPONSE.LOGIN.NOTVERIFIED,
              message: language.GENERAL.RESPONSE.LOGIN.NOTVERIFIED
              }
          }
          else if(userData.response == API_RESPONSE.GENERAL.USERNAMEREGEXFALSE)
          {
            return {
              response: APP_RESPONSE.GENERAL.USERNAMEREGEXFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.USERNAMEREGEXFALSE
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.PASSKEYREGEXFALSE)
          {
            return {
              response: APP_RESPONSE.GENERAL.PASSKEYREGEXFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.PASSKEYREGEXFALSE
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.INSECURENETWORK)
          {
            return {
              response: APP_RESPONSE.GENERAL.INSECURENETWORK,
              message: language.GENERAL.RESPONSE.GENERAL.INSECURENETWORK
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.USERNAMEORACTIONNULL)
          {
            return {
              response: APP_RESPONSE.GENERAL.USERNAMEORACTIONNULL,
              message: language.GENERAL.RESPONSE.GENERAL.USERNAMEORACTIONNULL
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.ACTIONFALSE)
          {
            return {
              response: APP_RESPONSE.GENERAL.ACTIONFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.ACTIONFALSE
            };
          }
          else
          {
            return {
              response: APP_RESPONSE.GENERAL.SERVER,
              message: language.GENERAL.RESPONSE.GENERAL.SERVER
            }
          }
  } catch (error: any) {
    return {
      response: APP_RESPONSE.GENERAL.NONETWORK,
      message: language.GENERAL.RESPONSE.GENERAL.NONETWORK
    };
  }
};

const getUsernameExist = async (params: URLSearchParams, language: any, useCase: useCaseForSession): Promise<APIResponse> => {
  
  params.append('action', 'checkUsernameExist');
  
  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    const userData: ServerResponse = user.data;
          if(userData.response == API_RESPONSE.GENERAL.USERNAMEEXISTFALSE)
          {
              return {
              response: useCase == "signup" ? APP_RESPONSE.GENERAL.USERNAMEAVAILABLE : APP_RESPONSE.GENERAL.USERNAMENOTAVAILABLE,
              message: useCase == "signup" ? language.GENERAL.RESPONSE.REGISTER.USERNAMEAVAILABLE : language.GENERAL.RESPONSE.LOGIN.USERNAMENOTAVAILABLE
              }
          }
          else if(userData.response == API_RESPONSE.GENERAL.USERNAMEEXISTTRUE)
          {
            return {
              response: useCase == "signup" ? APP_RESPONSE.GENERAL.USERNAMENOTAVAILABLE : APP_RESPONSE.GENERAL.USERNAMEAVAILABLE,
              message: useCase == "signup" ? language.GENERAL.RESPONSE.REGISTER.USERNAMENOTAVAILABLE : language.GENERAL.RESPONSE.LOGIN.USERNAMEAVAILABLE
            }
          }
          else if(userData.response == API_RESPONSE.GENERAL.USERNAMEREGEXFALSE)
          {
            return {
              response: APP_RESPONSE.GENERAL.USERNAMEREGEXFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.USERNAMEREGEXFALSE
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.INSECURENETWORK)
          {
            return {
              response: APP_RESPONSE.GENERAL.INSECURENETWORK,
              message: language.GENERAL.RESPONSE.GENERAL.INSECURENETWORK
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.USERNAMEORACTIONNULL)
          {
            return {
              response: APP_RESPONSE.GENERAL.USERNAMEORACTIONNULL,
              message: language.GENERAL.RESPONSE.GENERAL.USERNAMEORACTIONNULL
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.ACTIONFALSE)
          {
            return {
              response: APP_RESPONSE.GENERAL.ACTIONFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.ACTIONFALSE
            };
          }
          else
          {
            return {
              response: APP_RESPONSE.GENERAL.SERVER,
              message: language.GENERAL.RESPONSE.GENERAL.SERVER
            }
          }
      
    
    
  } catch (error: any) {
    return {
      response: APP_RESPONSE.GENERAL.NONETWORK,
      message: language.GENERAL.RESPONSE.GENERAL.NONETWORK
    };
  }
};


const getMatchResults = async (params: URLSearchParams, language: any): Promise<APIResponse> => {
  
  params.append('action', 'updatematches');
  
  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    const userData: ServerResponse = user.data;
          if(userData.response == API_RESPONSE.MATCHES.SUCCESS)
          {
              return {
                response: APP_RESPONSE.MATCHES.SUCCESS,
                message: language.GENERAL.RESPONSE.MATCHES.SUCCESS,
                data: userData.data
              }
          }
          else if(userData.response == API_RESPONSE.MATCHES.INVALIDACCOUNTTYPE)
          {
            return {
              response: APP_RESPONSE.MATCHES.INVALIDACCOUNTTYPE,
              message: language.GENERAL.RESPONSE.MATCHES.INVALIDACCOUNTTYPE
            };
          }
          else if(userData.response == API_RESPONSE.MATCHES.INVALIDPARAMS)
          {
            return {
              response: APP_RESPONSE.MATCHES.INVALIDPARAMS,
              message: language.GENERAL.RESPONSE.MATCHES.INVALIDPARAMS
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.USERNAMEREGEXFALSE)
          {
            return {
              response: APP_RESPONSE.GENERAL.USERNAMEREGEXFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.USERNAMEREGEXFALSE
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.TOKENFALSE)
          {
            return {
              response: APP_RESPONSE.GENERAL.TOKENFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.TOKENFALSE
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.INSECURENETWORK)
          {
            return {
              response: APP_RESPONSE.GENERAL.INSECURENETWORK,
              message: language.GENERAL.RESPONSE.GENERAL.INSECURENETWORK
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.USERNAMEORACTIONNULL)
          {
            return {
              response: APP_RESPONSE.GENERAL.USERNAMEORACTIONNULL,
              message: language.GENERAL.RESPONSE.GENERAL.USERNAMEORACTIONNULL
            };
          }
          else if(userData.response == API_RESPONSE.GENERAL.ACTIONFALSE)
          {
            return {
              response: APP_RESPONSE.GENERAL.ACTIONFALSE,
              message: language.GENERAL.RESPONSE.GENERAL.ACTIONFALSE
            };
          }
          else
          {
            return {
              response: APP_RESPONSE.GENERAL.SERVER,
              message: language.GENERAL.RESPONSE.GENERAL.SERVER
            }
          }
      
    
    
  } catch (error: any) {
    return {
      response: APP_RESPONSE.GENERAL.NONETWORK,
      message: language.GENERAL.RESPONSE.GENERAL.NONETWORK
    };
  }
};











//OLD
const addUser = async (params: URLSearchParams): Promise<any> => {
  params.append('action', 'register');
  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    return user.data;
  } catch (error: any) {
    return {
      response: 'error',
      message: error.message,
    };
  }
};



const getMatches = async (params: URLSearchParams): Promise<any> => {
  params.append('action', 'updatematches');

  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    return user.data;
  } catch (error: any) {
    return {
      response: 'error',
      message: error.message,
    };
  }
};


const sendEmailVerificationMail = async (
  params: URLSearchParams,
): Promise<any> => {
  params.append('action', 'sendEmailVericationMail');

  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    return user.data;
  } catch (error: any) {
    return {
      response: 'error',
    };
  }
};

const verifyAccount = async (params: URLSearchParams): Promise<any> => {
  params.append('action', 'verifyaccount');
  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    return user.data;
  } catch (error: any) {
    return {
      response: 'error',
      message: error.message,
    };
  }
};

const checkEmailNotVerified = async (params: URLSearchParams): Promise<any> => {
  params.append('action', 'checkEmailNotVerified');
  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    return user.data;
  } catch (error: any) {
    return {
      response: 'error',
      message: error.message,
    };
  }
};

const setPasscode = async (params: URLSearchParams): Promise<any> => {
  params.append('action', 'setpasscode');
  try {
    const user = await axios.post(ReQUEST_URL, params, AXIOS_HEADER_CONFIG);
    return user.data;
  } catch (error: any) {
    return {
      response: 'error',
      message: error.message,
    };
  }
};


const updateProfile = async (params: {
  email: string;
  authorization: string;
  name?: string;
  description?: string;
  interested?: string;
  gender?: string;
  relation_status?: string;
}) => {
  try {
    const user = await axios({
      method: 'post',
      url: ReQUEST_URL + '/update-profile',
      params: params,
    });
    return user.data;
  } catch (error: any) {
    return {
      response: 'error',
      message: error.message,
    };
  }
};

export {
  getUsernameExist,
  loginUser,
  getMatchResults,
  addUser,
  getMatches,
  verifyAccount,
  checkEmailNotVerified,
  sendEmailVerificationMail,
  setPasscode,
  updateProfile
};
