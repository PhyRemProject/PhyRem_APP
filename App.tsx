import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import {
  Button
} from 'react-native-elements';
import SettingsView from './components/Exercise/SettingsView';
import SensorVis from './components/Exercise/SensorVis';
import Dashboard from './components/Dashboard/Dashboard';
import { FontDisplay } from 'expo-font';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import SensorDataView from './components/SensorDataView';



const App = () => {

  const { Navigator, Screen } = createStackNavigator();

  const Tab = createMaterialBottomTabNavigator();

  const [loaded] = useFonts({
    "Rawline-Light": require("./assets/fonts/rawline-300.ttf"),
    "Rawline": require("./assets/fonts/rawline-400.ttf"),
    "Rawline-Bold": require("./assets/fonts/rawline-600.ttf"),
    "Rawline-Black": require("./assets/fonts/rawline-900.ttf")
  });

  // if (!loaded) {
  //   return <View>
  //     <Text>Loading ...</Text>
  //   </View>;
  // } else {

    return (
      <>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Início" activeColor="#736DFD" inactiveColor="#D7D6FF" labeled shifting={false} barStyle={{ backgroundColor: '#FFF', borderTopColor: "#DDD", borderStyle: "solid", borderTopWidth: 1 }}>
            <Tab.Screen name="Médicos" component={SensorVis}/>
            <Tab.Screen name="Consultas" component={SensorVis} />
            <Tab.Screen name="SensorVis" component={SensorVis} />
            <Tab.Screen name="Início" component={Dashboard} />
            <Tab.Screen name="Definições" component={SettingsView} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );
}

export default App;