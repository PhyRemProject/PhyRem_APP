import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faUserMd, faCalendarCheck, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons'
import {
  Button
} from 'react-native-elements';
import SettingsView from './components/Exercise/SettingsView';
import SensorVis from './components/Exercise/SensorVis';
import Dashboard from './components/Dashboard/Home';
import { FontDisplay } from 'expo-font';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import SensorDataView from './components/SensorDataView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStore, Action } from "redux"
import { Provider, useSelector } from "react-redux"
import Navigation from './components/Navigation/Navigation';
import UserReducer from './components/User/UserReducer';

const App = () => {

  const [loaded] = useFonts({
    "Rawline-Light": require("./assets/fonts/rawline-300.ttf"),
    "Rawline": require("./assets/fonts/rawline-400.ttf"),
    "Rawline-Bold": require("./assets/fonts/rawline-600.ttf"),
    "Rawline-Black": require("./assets/fonts/rawline-900.ttf")
  });


  //barStyle={{ backgroundColor: '#FFF', borderTopColor: "#DDD", borderStyle: "solid", borderTopWidth: 1 }}

  const reduxLoaded = useSelector((state: any) => state._persist.rehydrated)
  const email = useSelector((state: UserReducer) => state.UserReducer.user?.email) as string
  const password = useSelector((state: UserReducer) => state.UserReducer.user?.password) as string

  console.log(reduxLoaded)
  console.log(email)


  if (!loaded || !reduxLoaded) {
    return <View>
      <Text>Loading ...</Text>
    </View>;
  } else {

    return (
      <>
        <Navigation loggedIn={email !== undefined} />
      </>
    );
  }
}

export default App;