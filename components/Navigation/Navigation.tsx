import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faUserMd, faCalendarCheck, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons'
import SettingsView from '../Exercise/SettingsView';
import SensorVis from '../Exercise/SensorVis';
import Dashboard from '../Dashboard/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Navigation = (props: any) => {

    const { Navigator, Screen } = createStackNavigator();

    const Tab = createBottomTabNavigator();

    const customTabBarStyle = {
        activeTintColor: '#736DFD',
        inactiveTintColor: '#A7A4FF',
        style: { backgroundColor: 'white' },
    }

    return (

        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Início"
                tabBarOptions={customTabBarStyle}
            >
                <Tab.Screen name="Médicos" component={SensorVis} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faUserMd} style={{ color }} size={22} />
                    )
                }} />
                <Tab.Screen name="Consultas" component={SensorVis} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faCalendarCheck} style={{ color }} size={22} />
                    )
                }} />
                <Tab.Screen name="SensorVis" component={SensorVis}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ color }) => (
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: -10, // space from bottombar
                                    height: 68,
                                    width: 68,
                                    borderRadius: 68 / 2,
                                    backgroundColor: "#736DFD",
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}
                            >
                                <Text style={{ fontSize: 30, color: "#FFF" }}>+</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen name="Início" component={Dashboard} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faHome} style={{ color }} size={22} />
                    )
                }} />
                <Tab.Screen name="Definições" component={SettingsView} options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faChartBar} style={{ color }} size={22} />
                    )
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );

}

export default Navigation;