import * as React from 'react';
import { BeforeLoginStack } from './screens/Mainnavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AppStore from './redux/store/AppStore';

const store = AppStore();

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <BeforeLoginStack />
        </NavigationContainer>
      </Provider>
  );
}

