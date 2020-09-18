import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import NetInfo from '@react-native-community/netinfo';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWifi } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../Global/GradientButton';

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

const NewExercise = ({ navigation }: Props) => {

    const [status, setStatus] = useState()
    const [internet, setInternetStatus] = useState<any>()
    const dispatch = useDispatch();

    useEffect(() => {
        NetInfo.fetch().then(state => {
            setInternetStatus(state.isConnected)
        });
    }, [])

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
                    height: "10%",
                    width: "100%",
                }}>
                    <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 22 }}>Novo Exercício</Text>
                </View>
                <View style={{
                    flexDirection: "column",
                    paddingRight: 15,
                    paddingLeft: 15,
                    alignContent: "center",
                    height: "80%",
                    width: "100%",
                }}>
                    {
                        !internet ?
                            <View style={{
                                flexDirection: "column",
                                height: "100%",
                                width: "100%",
                            }}>
                                <Image
                                    source={require("../../assets/images/wifi-off.png")}
                                    style={{
                                        alignSelf: "center",
                                        width: "50%",
                                        maxHeight: 300,
                                        resizeMode: "center"
                                    }}
                                />
                                <Text style={{
                                    fontFamily: "Rawline-Bold",
                                    color: "#5954DB",
                                    fontSize: 22,
                                    textAlign: "center"
                                }}>
                                    Não está ligado à internet
                                           </Text>
                                <Text style={{
                                    paddingTop: 30,
                                    fontFamily: "Rawline",
                                    color: "#333",
                                    fontSize: 15,
                                    textAlign: "center"
                                }}>
                                    Por favor estabeleça uma ligação para poder registar um exercício
                                            </Text>

                                <LinearGradient
                                    // Button Linear Gradient
                                    colors={['rgba(87,81,219,1.0)', 'rgba(155,152,233,1.0)']}
                                    start={[0, 1]}
                                    end={[1.5, 0]}
                                    style={{
                                        flexDirection: "column",
                                        padding: 15,
                                        height: 60,
                                        alignContent: "center",
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        alignSelf: "stretch",
                                        marginTop: 30
                                    }}
                                >
                                    <Text
                                        style={{ fontFamily: "Rawline", color: "#FFF", fontSize: 17, width: "90%", height: "100%", textAlign: "center", textAlignVertical: "center" }}
                                        onPress={() => { navigation.navigate("Dashboard") }}
                                    >
                                        Voltar
          </Text>
                                </LinearGradient>

                            </View>
                            :
                            <View style={{
                                flexDirection: "column",
                                height: "80%",
                                width: "100%",
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    width: "100%",
                                }}>

                                    <GradientButton
                                        title={"Cotovelo Direito"}
                                        onPress={() => { navigation.navigate("SensorPrep");}}
                                        buttonStyle={{ width: "40%" }}
                                        textStyle={{ fontSize: 13 }}
                                    />
                                    <GradientButton
                                        title={"Cotovelo Esquerdo"}
                                        onPress={() => {}}
                                        buttonStyle={{ width: "40%", position: "absolute", right: 0 }}
                                        textStyle={{ fontSize: 13 }} disabled />
                                </View>
                                <Image
                                    source={require("../../assets/images/exercise_select.png")}
                                    style={{
                                        alignSelf: "center",
                                        height: "100%",
                                        resizeMode: "center"
                                    }}
                                />
                                <View style={{
                                    flexDirection: "row",
                                    width: "100%"
                                }}>

                                    <GradientButton
                                        title={"Joelho Direito"}
                                        onPress={() => { navigation.navigate("ExerciseView") }}
                                        buttonStyle={{ width: "40%" }}
                                        textStyle={{ fontSize: 13 }} disabled />
                                    <GradientButton
                                        title={"Joelho Esquerdo"}
                                        onPress={() => { navigation.navigate("ExerciseView") }}
                                        buttonStyle={{ width: "40%", position: "absolute", right: 0 }}
                                        textStyle={{ fontSize: 13 }} disabled />
                                </View>

                                <View style={{
                                    flexDirection: "column",
                                    alignContent: "center",
                                    height: 30,
                                }}>
                                    <Text style={{
                                        fontFamily: "Rawline",
                                        color: "#333",
                                        fontSize: 15,
                                        textAlign: "center",
                                        paddingTop: 10
                                    }}>
                                        Escolha a zona que pretende exercitar
                                            </Text>
                                </View>


                            </View>
                    }
                </View>
            </View>
        </>
    );
}


export default NewExercise;