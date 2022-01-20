import { createStore, combineReducers } from 'redux';
import { generalSessionReducer, loginSessionReducer, profileSessionReducer } from '../reducers/Session';


const appReducer = combineReducers(
  {
    general_session: generalSessionReducer,
    login_session: loginSessionReducer,
    profile_session: profileSessionReducer,

  }

);

const AppStore = () => {
  return createStore(appReducer);
}

export default AppStore;