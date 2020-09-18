import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { NavigationContainer, BaseNavigationContainer } from '@react-navigation/native';
import SensorVis from '../Exercise/SensorVis';
import { createStackNavigator } from '@react-navigation/stack';
import NewExercise from './NewExercise';
import { NavigationStackProp } from 'react-navigation-stack';
import SensorPrep from './SensorPrep';

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
  };


const Exercise = ({navigation} : Props) => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="NewExercise">
            <Stack.Screen name="NewExercise" component={NewExercise} options={{ headerShown: false }} />
            <Stack.Screen name="SensorPrep" component={SensorPrep} options={{headerShown : false}}/>
            <Stack.Screen name="ExerciseView" component={SensorVis} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default Exercise;