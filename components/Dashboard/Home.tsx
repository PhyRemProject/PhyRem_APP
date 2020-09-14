import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Button
} from 'react-native-elements';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SettingsView from '../Exercise/SettingsView';
import SensorVis from '../Exercise/SensorVis';
import {useSelector, useDispatch} from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import UserReducer, { USER_LOGIN } from '../User/UserReducer';
import { AttemptLogin } from '../User/UserActions';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserSettings from '../User/UserSettings';
import Dashboard from './Dashboard';
//import SensorDataView from './components/SensorDataView';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Rawline'
    },
});

const BE_URL = "http://192.168.2.100:5000/api/"

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
  };

const Home = ({navigation} : Props) => {

    const Stack = createStackNavigator();
  
    return (
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown : false}}/>
                <Stack.Screen name="Settings" component={UserSettings} options={{headerShown : false}}/>
                {/* <Stack.Screen name="Signup" component={SignUp} /> */}
            </Stack.Navigator>
    );

}


export default Home;

