import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Button
} from 'react-native-elements';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SettingsView from '../Exercise/SettingsView';
import SensorVis from '../Exercise/SensorVis';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import UserReducer, { USER_LOGIN } from '../User/UserReducer';
import { AttemptLogin } from '../User/UserActions';
//import SensorDataView from './components/SensorDataView';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Rawline'
    },
});

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

const Welcome = ({ navigation }: Props) => {

    const [status, setStatus] = useState()
    const dispatch = useDispatch();

    return (
        <>
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: "column",
                backgroundColor: "#FFF"
            }}>
                <View style={{
                    flexDirection: "row",
                    paddingTop: 35,
                    paddingLeft: 35,
                    paddingRight: 15,
                    alignContent: "center",
                    height: "20%",
                    width: "100%",
                }}>
                    <Text style={{ fontFamily: "Rawline", color: "#5954DB", fontSize: 22 }}><Text style={{ fontFamily: "Rawline-Bold" }}>Fisioterapia</Text> {"à distância \ncom a mesma eficácia e carinho"} </Text>
                </View>
                <View style={{
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    height: "40%",
                    width: "100%",
                }}>
                    <Image
                        source={require("../../assets/images/login_welcome.png")}
                        style={{
                            height: "75%",
                            resizeMode: "center",
                        }}
                    />
                </View>
                <View style={{
                    flexDirection: "column",
                    padding: 15,
                    alignContent: "center",
                    alignItems: "center",
                    height: "35%",
                    width: "100%"
                }}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['rgba(87,81,219,1.0)', 'rgba(155,152,233,1.0)']}
                        start={[0, 1]}
                        end={[1.5, 0]}
                        style={{
                            padding: 15,
                            height: 60,
                            alignItems: 'center',
                            borderRadius: 5,
                            alignSelf: "stretch"
                        }}
                    >
                        <Text
                            style={{ fontFamily: "Rawline", color: "#FFF", fontSize: 17, width: "100%", height: "100%", textAlign: "center" }}
                            onPress={() => { dispatch(AttemptLogin("other7@gmail.com", "qwe123", setStatus)) }}
                        >

                            Quero-me inscrever
          </Text>
                    </LinearGradient>

                    <View
                        style={{
                            marginTop: 20,
                            height: 60,
                            padding: 15,
                            alignItems: 'center',
                            alignSelf: "stretch",
                            borderStyle: "solid",
                            borderColor: "#736DFD",
                            borderWidth: 2,
                            borderRadius: 10
                        }}>
                        <Text
                            style={{ fontFamily: "Rawline-Bold", color: "#736DFD", fontSize: 17, width: "100%", height: "100%", textAlign: "center" }}
                            onPress={() => { navigation.navigate("Login") }}
                        >
                            Já tenho conta
                        </Text>
                    </View>

                </View>
            </View>
        </>
    );
}


export default Welcome;