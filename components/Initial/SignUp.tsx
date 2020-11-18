import React, { useState, useEffect } from 'react';
import { NavigationContainer, BaseNavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../Initial/Welcome';
import Login from '../Initial/Login';
import SignUp1 from './SignUp1';
import SignUp2 from './SignUp2';



const SignUp = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="SignUp1">
            <Stack.Screen name="SignUp1" component={SignUp1} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp2" component={SignUp2} options={{headerShown : false}}/>
        </Stack.Navigator>
    );
}

export default SignUp;