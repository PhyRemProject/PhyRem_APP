import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import UserReducer, { ADD_PROGRESS, RESET_PROGRESS, USER_LOGIN } from '../User/UserReducer';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SERVICE_API } from '../../constants';
import { HeaderHeightContext } from '@react-navigation/stack';
import GradientButton from '../Global/GradientButton';

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};


const Dashboard = ({ navigation }: Props) => {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const progress = useSelector((state: UserReducer) => state.UserReducer.progress) as number
    const patientID = useSelector((state: UserReducer) => state.UserReducer.user?._id) as string
    const patientName = useSelector((state: UserReducer) => state.UserReducer.user?.name) as string
    const [status, setStatus] = useState("idle")
    const dispatch = useDispatch()
    console.log(token)

    

    return (
        <View style={{
            width: "100%",
            height: "100%"
        }}>
            <View style={{
                width: "100%",
                flexDirection: "column",
                height: "36%"
            }}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(87,81,219,1.0)', 'rgba(155,152,233,1.0)']}
                    start={[0, 1]}
                    end={[0.8, 0]}
                    style={{
                        zIndex: -1,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: "100%"
                    }}
                />
                <View style={{
                    zIndex: 2,
                    flexDirection: "row",
                    padding: 15,
                    alignContent: "center",
                    width: "100%",
                    height: "40%"
                }}>
                    <View style={{ width: "40%" }}>
                        <Text style={{ fontFamily: "Rawline", color: "white", fontSize: 22, }}>Olá</Text>
                        <Text style={{ fontFamily: "Rawline-Bold", color: "white", fontSize: 25, lineHeight: 27 }}>{patientName.split(" ")[0]}!</Text>
                    </View>
                    <View style={{ width: "30%" }}></View>
                    <View style={{ width: "30%" }}>
                        {/* <Image source={require("../../assets/images/user.png")} style={{ height: 70, width: 70, borderRadius: 70 / 2, alignSelf: "center" }} /> */}
                        <TouchableOpacity onPress={() => { navigation.navigate("Settings") }}>
                            <Image
                                source={{ uri: SERVICE_API + "patient/profileImage/" + patientID }}
                                style={{ height: 70, width: 70, borderRadius: 70 / 2, alignSelf: "center" }}

                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    flexDirection: "column",
                    marginTop: 15,
                    width: "100%",
                    height: "60%"
                }}>
                    <View style={{ paddingLeft: 15 }}>
                        <Text style={{ fontFamily: "Rawline", color: "white", fontSize: 15 }}>Progresso da semana</Text>
                    </View>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: 10,
                        height: 50,
                        paddingLeft: 15,
                        paddingRight: 15,
                        alignContent: "center",
                    }}>
                        <View style={{
                            zIndex: 4,
                            height: 50,
                            width: "100%",
                            backgroundColor: "rgba(165,162,240,0.78)",
                            borderRadius: 10,
                        }}>
                            <View style={{
                                minWidth: "8%", 
                                height: 50,
                                width: Math.min(33.3 * progress, 100) + "%",
                                backgroundColor: "rgba(102, 6, 212,1)",
                                borderRadius: 10,
                            }}>
                                <Text style={{ fontFamily: "Rawline-Bold", color: "white", fontSize: 15, textAlignVertical: "center", alignSelf: "center" }}>{(Math.min(33.3 * progress, 100)).toFixed(0)}%</Text>
                            </View>
                        </View>
                    </View >
                </View >
            </View>


            <View style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: 'wrap',
                height: "60%",
                paddingTop: 10,
                backgroundColor: "white"
            }}>
                <View style={{
                    height: "30%",
                    width: "47%",
                    marginLeft: "2%",
                    backgroundColor: "#8582E4",
                    borderRadius: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5
                }}>
                    <Text style={{
                        fontFamily: "Rawline",
                        fontSize: 12,
                        alignSelf: "flex-start",
                        color: "#FFF"
                    }}>
                        Próxima Consulta
                              </Text>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        height: "70%",
                        alignContent: "center"
                    }}>
                        <Text style={{
                            fontFamily: "Rawline-Bold",
                            fontSize: 18,
                            width: "100%",
                            color: "#FFF",
                            textAlignVertical: "center"
                        }}>2 Fevereiro</Text>
                        <Text style={{
                            fontFamily: "Rawline-Bold",
                            fontSize: 15,
                            width: "100%",
                            color: "#FFF",
                            textAlignVertical: "center"
                        }}>Dr. Miguel Machado</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    height: "30%",
                    width: "47%",
                    marginLeft: "2%",
                    marginRight: "2%",
                    backgroundColor: "rgba(215,214,255,1.0)",
                    borderRadius: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5
                }}>
                    <Text style={{ fontFamily: "Rawline", height: "25%", width: "100%", color: "#6F6CB0" }}>Próxima Actividade</Text>
                    <Text style={{
                        fontFamily: "Rawline-Bold",
                        height: "75%",
                        width: "100%",
                        color: "#6F6CB0",
                        textAlign: "center",
                        textAlignVertical: "center"
                    }}>Cotovelo Direito</Text>
                </View>

                <View style={{
                    height: "69%",
                    width: "96%",
                    marginTop: "2%",
                    marginLeft: "2%",
                    marginRight: "2%",
                    backgroundColor: "rgba(215,214,255,1.0)",
                    borderRadius: 10,
                    padding: 10,
                }}>
                    <Text style={{ fontFamily: "Rawline-Bold", width: "100%", color: "#6F6CB0" }}>Actividades</Text>
                    <ScrollView style={{
                        height: "100%",
                    }}>
                        <Text style={{
                            fontFamily: "Rawline",
                            color: "#6F6CB0",
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                            paddingTop: "25%",
                        }}>Está um pouco parado 😕</Text>

                        {/* <Text style={{ color: "#6F6CB0", width: "100%", height: 500 }}>{token}</Text> */}
                    </ScrollView>
                </View>

            </View>

        </View>
    );
}

export default Dashboard;