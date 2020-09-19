import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import { AttemptLogin, AttemptLogout } from '../User/UserActions';

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

const UserSettings = ({ navigation }: Props) => {

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
                    padding: 15,
                    alignContent: "center",
                    height: "13%",
                    width: "100%",
                }}>
                    <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 22 }}>Definições</Text>
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
                            alignSelf: "stretch",
                            marginTop: 30
                        }}
                    >
                        <Text
                            style={{ fontFamily: "Rawline", color: "#FFF", fontSize: 17, width: "90%", height: "100%", textAlign: "center" }}
                            onPress={() => { AttemptLogout()}}
                        >
                            Terminar Sessão
          </Text>
                    </LinearGradient>
                </View>

            </View>
        </>
    );
}


export default UserSettings;