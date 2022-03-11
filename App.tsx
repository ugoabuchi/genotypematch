import * as Notifications from 'expo-notifications';
import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { BeforeLoginStack } from './screens/Mainnavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AppStore from './redux/store/AppStore';
import * as Font from 'expo-font';

Notifications.setNotificationHandler(null);

const store = AppStore();

// function to load the font(s)
const loadFonts = () => {
  return Font.loadAsync({
    'LeagueSpartan-Bold': require("./assets/fonts/LeagueSpartan-Bold.otf"),
    'BakerieSmooth-Regular': require("./assets/fonts/BakerieSmooth-Regular.otf")
  });
};

export default function App() {
  
  const [ fontsLoaded, setFontsLoaded ] = React.useState(false);


  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onError={console.warn}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
        <NavigationContainer>
          <BeforeLoginStack />
        </NavigationContainer>
      </Provider>
  );
}

