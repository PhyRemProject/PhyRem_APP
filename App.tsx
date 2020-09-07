import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { AppLoading } from "expo";
import * as Font from "expo-font"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import {
  Button
} from 'react-native-elements';
import SettingsView from './components/Exercise/SettingsView';
import SensorVis from './components/Exercise/SensorVis';
import Dashboard from './components/Dashboard/Dashboard';
//import SensorDataView from './components/SensorDataView';


const getFonts = () => Font.loadAsync({
  'rawline-regular': require("./assets/fonts/rawline-300.ttf")
})


const App = () => {

  const { Navigator, Screen } = createStackNavigator();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  } else {
    return (
      <>
        <NavigationContainer>
          <Navigator headerMode="none" initialRouteName="Dashboard">
            <Screen name="Dashboard" component={Dashboard} />
            <Screen name="SensorVis" component={SensorVis} />
            <Screen name="SettingsView" component={SettingsView} />
          </Navigator>
        </NavigationContainer>
      </>
    );
  }

}

export default App;