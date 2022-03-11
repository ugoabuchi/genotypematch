import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import GMHome from './GMHome';
import Matches from './Matches';
import Messages from './Messages';
import Notifications from './Notifications';
import Market from './Market';
import { connect } from 'react-redux';
import { NavPropsType } from '../types';

const AfterLoginTab = ({ navigation, profile_session, general_session }: NavPropsType) => {
  
    
    const Tab = createBottomTabNavigator();


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
        <Tab.Screen name="Encounter" component={GMHome} options={{headerShown: false}}/>
        <Tab.Screen name="Matches" component={Matches} options={{headerShown: false}}/>
        <Tab.Screen name="Chats" component={Messages} options={{headerShown: false}}/>
        {
            general_session.general_session.GNC > 0 
            ?
            (
                <Tab.Screen name="Notifications" component={Notifications} options={{
                    headerShown: false,
                    tabBarBadge: general_session.general_session.GNC > 10 ? "10+" : general_session.general_session.GNC
                  }}/>
            )
            : 
            (
                <Tab.Screen name="Notifications" component={Notifications} options={{
                    headerShown: false
                  }}/>
            )
        }
        <Tab.Screen name="Market" component={Market} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  
  
  };

const mapStateToProps = (state: any) => ({
    profile_session: state.profile_session,
    general_session: state.general_session,
});


export default connect(mapStateToProps)(AfterLoginTab)