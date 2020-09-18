import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faUserMd, faCalendarCheck, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons'
import SettingsView from '../Exercise/SettingsView';
import SensorVis from '../Exercise/SensorVis';
import Home from '../Dashboard/Home';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import UserReducer from '../User/UserReducer';
import { AttemptLogin, AttemptLogout } from '../User/UserActions';
import Appointments from '../Appointments/Appointments';
import Physicians from '../Physicians/Physicians';
import History from '../History/History';
import NewExercise from "../Exercise/NewExercise"
import jwt from 'jwt-decode'
import Exercise from '../Exercise/Exercise';

interface NavigationProps {

}

const LoggedInNavigation = (props: NavigationProps) => {

    const Tab = createBottomTabNavigator();

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const email = useSelector((state: UserReducer) => state.UserReducer.user?.email) as string
    const password = useSelector((state: UserReducer) => state.UserReducer.user?.password) as string
    const [status, setStatus] = useState()
    const dispatch = useDispatch();

    const customTabBarStyle = {
        activeTintColor: '#736DFD',
        inactiveTintColor: '#A7A4FF',
        style: { backgroundColor: 'white', paddingBottom: 7, height: 55 }
    }

    useEffect(() => {
        //Check if the stored token is still valid
        //  If it has less a minute or less of validity, renew the token
        let decoded: any = jwt(token);
        if ((decoded.exp * 1000 - Date.now()) < 60000) {
            dispatch(AttemptLogin(email, password, setStatus))
        }
    }, [])

    useMemo(() => {
        if (status && status !== "success") {
            Alert.alert(
                "Login Falhado",
                "As credenciais poderão ter expirado, ou foram alteradas.\n Faça login novamente.",
                [
                    { text: "OK", onPress: () => AttemptLogout() }
                ],
                { cancelable: false }
            );
        }
    }, [status])

return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={customTabBarStyle}
        >
            <Tab.Screen name="Physicians" component={Physicians} options={{
                tabBarLabel: 'Médicos',
                tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faUserMd} style={{ color }} size={22} />
                )
            }} />
            <Tab.Screen name="Appointments" component={Appointments} options={{
                tabBarLabel: 'Consultas',
                tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faCalendarCheck} style={{ color }} size={22} />
                )
            }} />
            <Tab.Screen name="Exercise" component={Exercise}
                options={{
                    tabBarLabel: '',
                    
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: -18, // space from bottombar
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
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: 'Início',
                tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faHome} style={{ color }} size={22} />
                )
            }} />
            <Tab.Screen name="History" component={History} options={{
                tabBarLabel: 'Histórico',
                tabBarIcon: ({ color }) => (
                    <FontAwesomeIcon icon={faChartBar} style={{ color }} size={22} />
                )
            }} />
        </Tab.Navigator>
    </NavigationContainer>
);

}

export default LoggedInNavigation;