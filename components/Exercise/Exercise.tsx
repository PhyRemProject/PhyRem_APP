import React, { useState, useEffect } from 'react';
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
            {/* <Stack.Screen name="ExerciseView" component={ExerciseView} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    );
}

export default Exercise;