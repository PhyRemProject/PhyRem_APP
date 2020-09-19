import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { createStackNavigator } from '@react-navigation/stack';
import UserSettings from '../User/UserSettings';
import Dashboard from './Dashboard';

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

