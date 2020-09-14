import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { NavigationContainer, BaseNavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faUserMd, faCalendarCheck, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons'
import SettingsView from '../Exercise/SettingsView';
import SensorVis from '../Exercise/SensorVis';
import Dashboard from '../Dashboard/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../Initial/Welcome';
import Login from '../Initial/Login';



const LoggedOffNavigation = () => {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} options={{headerShown : false}}/>
                <Stack.Screen name="Login" component={Login} options={{headerShown : false}}/>
                {/* <Stack.Screen name="Signup" component={SignUp} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default LoggedOffNavigation;