import React, { useState, useEffect } from 'react';
import { NavigationContainer, BaseNavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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