import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faUserMd, faCalendarCheck, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons'
import SettingsView from '../Exercise/SettingsView';
import SensorVis from '../Exercise/SensorVis';
import Dashboard from '../Dashboard/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoggedOffNavigation from './LoggedOffNavigation';
import LoggedInNavigation from './LoggedInNavigation';


interface NavigationProps {
    loggedIn: boolean
}

const Navigation = (props: NavigationProps) => {


    return (
        <>
        {
            !props.loggedIn ? 
            <LoggedOffNavigation/>
            :
            <LoggedInNavigation/>
        }
        </>
    );

}

export default Navigation;