import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import {
    Button
} from 'react-native-elements';
import SettingsView from '../Exercise/SettingsView';
import SensorVis from '../Exercise/SensorVis';
//import SensorDataView from './components/SensorDataView';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default function Dashboard({ navigation }) {

    const changeToSettings = () => {
        navigation.navigate("SettingsView", { styles })
    }
    const changeToVis = () => {
        //setOpenView(3);
        navigation.navigate("SensorVis", { styles })
    }

    return (
        <>
            <View style={{
                flexDirection: "row",
                backgroundColor: "#5751DB",
                height: "25%",
                width: "100%",
                padding: 25,
            }}>
                <View style={{ }}>
                    <Text style={{ color: "white", fontSize: 22 }}>Olá</Text>
                    <Text style={{ color: "white", fontSize: 33, fontWeight: "bold" }}>Joana!</Text>

                </View>
                <View style={{ alignSelf: "center", width: "50%" }}></View>
                <View style={{ alignSelf: "stretch" }}>
                    <Image source={require("../../assets/images/user.png")} style={{ height: 70, width: 70, borderRadius: 70 / 2 }} />
                </View>
            </View >
            <View style={styles.container}>
                <Text>This app test wifi network switching.</Text>
                <Text>Go to settings</Text>
                <Button title="Settings" onPress={changeToSettings} />
                <Button title="3D Vis" onPress={changeToVis} />
            </View>
        </>
    );
}

