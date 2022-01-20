import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MenuDrawer from './Drawer';
import GMHome from './GMHome';
import GMLogin from './GMLogin';
import Matches from './Matches';
import Messages from './Messages';
import Settings from './Settings';
import Session from './Session';
import SplashScreen from './SplashScreen';
import StartUpSplash from './StartUpSplash';
import Notifications from './Notifications';
import Market from './Market';
const screenOptionStyle = {
  headerShown: false
};


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();



const BeforeLoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="StartUpSplash" component={StartUpSplash} />
      <Stack.Screen name="Session" component={Session} />
      <Stack.Screen name="GMLogin" component={GMLogin} />
      <Stack.Screen name="Main" component={AfterLoginDrawer} />
    </Stack.Navigator>
  );
}


const AfterLoginTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Encounter"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = "", iconSize = 0;

          if (route.name === 'Encounter') {
            iconName = focused ? 'ios-compass' : 'ios-compass-outline';
            iconSize = focused ? 30 : 24;
          } else if (route.name === 'Matches') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            iconSize = focused ? 30 : 24;
          }
          else if (route.name === 'Chats') {
            iconName = focused ? 'ios-chatbubble' : 'ios-chatbubble-outline';
            iconSize = focused ? 30 : 24;
          }
          else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
            iconSize = focused ? 30 : 24;
          }
          else {
            iconName = focused ? 'ios-basket' : 'ios-basket-outline';
            iconSize = focused ? 30 : 24;
          }
          return <Ionicons name={iconName} size={iconSize} color={"#1F3A68"} />;
        },
      })}



    >
      <Tab.Screen name="Encounter" component={GMHome} />
      <Tab.Screen name="Matches" component={Matches} />
      <Tab.Screen name="Chats" component={Messages} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Market" component={Market} />
    </Tab.Navigator>
  );
};

const OtherStack = () => {

  return (

    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>

  );

}

const AfterLoginDrawer = () => {

  return (
    <Drawer.Navigator
      initialRouteName="AfterLogin"
      drawerContent={(props) => <MenuDrawer {...props} />}>
      <Drawer.Screen name="AfterLogin" component={AfterLoginTab} />
      <Drawer.Screen name="Others" component={OtherStack} />


    </Drawer.Navigator>
  );

}

export { BeforeLoginStack, AfterLoginDrawer }