import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuDrawer from './Drawer';
import GMLogin from './GMLogin';
import Settings from './Settings';
import Session from './Session';
import SplashScreen from './SplashScreen';
import StartUpSplash from './StartUpSplash';
import AfterLoginTab from './AfterLoginTab';

const ScreenOptionSettings = {
  headerShown: false
};


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();



const BeforeLoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={ScreenOptionSettings}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="StartUpSplash" component={StartUpSplash} />
      <Stack.Screen name="Session" component={Session} />
      <Stack.Screen name="GMLogin" component={GMLogin} />
      <Stack.Screen name="Main" component={AfterLoginDrawer} />
    </Stack.Navigator>
  );
}




const OtherStack = () => {

  return (

    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={ScreenOptionSettings}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>

  );

}

const AfterLoginDrawer = () => {

  return (
    <Drawer.Navigator
      initialRouteName="AfterLogin"
      screenOptions={ScreenOptionSettings}
      drawerContent={(props) => <MenuDrawer {...props} />}>
      <Drawer.Screen name="AfterLogin" component={AfterLoginTab} />
      <Drawer.Screen name="Others" component={OtherStack} />


    </Drawer.Navigator>
  );

}

export { BeforeLoginStack, AfterLoginDrawer}