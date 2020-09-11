import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Button
} from 'react-native-elements';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SettingsView from '../Exercise/SettingsView';
import SensorVis from '../Exercise/SensorVis';
import {useSelector, useDispatch} from "react-redux"
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


export default function Dashboard({ navigation }: Props) {

    const changeToSettings = () => {
        navigation.navigate("SettingsView", { styles })
    }
    const changeToVis = () => {
        //setOpenView(3);
        navigation.navigate("SensorVis", { styles })
    }

    
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token ) as string
    const [status, setStatus] = useState("idle")
    const dispatch = useDispatch()
    console.log(token)

    return (
        <>
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: "row",
                maxHeight: "30%"
            }}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(87,81,219,1.0)', 'rgba(155,152,233,1.0)']}
                    start={[0, 1]}
                    end={[0.8, 0]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: "100%"
                    }}
                />
                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    alignContent: "center",
                }}>
                    <View style={{ alignSelf: "flex-start", flexBasis: "70%" }}>
                        <Text style={{ fontFamily: "Rawline", color: "white", fontSize: 22, }}>Olá</Text>
                        <Text style={{ fontFamily: "Rawline-Bold", color: "white", fontSize: 25, lineHeight: 27 }}>Joana!</Text>
                    </View>
                    <View style={{ alignSelf: "flex-end", flexBasis: "30%" }}>
                        <Image source={require("../../assets/images/user.png")} style={{ height: 70, width: 70, borderRadius: 70 / 2, alignSelf: "center" }} />
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    paddingLeft: 15,
                    paddingRight: 15,
                    alignContent: "center",
                }}>
                    <View style={{ alignSelf: "flex-start", flexDirection: "row", flexBasis: "100%" }}>
                        <Text style={{ fontFamily: "Rawline", color: "white", fontSize: 15 }}>Progresso da semana</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    marginTop: 5,
                    height: 50,
                    marginLeft: 15,
                    marginRight: 15,
                    alignContent: "center",
                }}>
                    <View style={{
                        alignSelf: "flex-start", flexDirection: "row", height: 50,
                        flexBasis: "100%", backgroundColor: "rgba(165,162,240,0.78)",
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,
                        elevation: 11
                    }}>
                        <View style={{
                            alignSelf: "flex-start", width: "8%", height: 50,
                            backgroundColor: "rgba(120,75,250,1.0)",
                            borderRadius: 10,
                            shadowColor: "#FFFFFF",
                            shadowOffset: {
                                width: 5,
                                height: 5,
                            },
                            shadowOpacity: 1.0,
                            shadowRadius: 6.68,
                            elevation: 3
                        }}>
                            <Text style={{ fontFamily: "Rawline-Bold", color: "white", fontSize: 15, textAlignVertical: "center", alignSelf: "center" }}>0%</Text>
                        </View>
                    </View>
                </View >
            </View >

            {/* <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: "row",
                maxHeight: "11%",
                padding: 10,
                backgroundColor: "white"
            }}>
                <View style={{
                    alignSelf: "flex-start", flexDirection: "row", height: 50,
                    flexBasis: "100%", backgroundColor: "rgba(215,214,255,1.0)",
                    borderRadius: 10, paddingLeft: 10
                }}>
                    <Text style={{ alignSelf: "center", color: "#6F6CB0" }}>Última notificação</Text>
                </View>
            </View>
 */}
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: "row",
                maxHeight: "18%",
                paddingTop: 10,
                paddingLeft: 10,
                backgroundColor: "white"
            }}>
                <View style={{
                    alignSelf: "flex-start", flexDirection: "row", height: "100%",
                    flexBasis: "49%", backgroundColor: "#8582E4",
                    borderRadius: 10, paddingLeft: 10, paddingRight: 5
                }}>
                    <Text style={{ alignSelf: "center", color: "#FFF" }}>Próxima Consulta</Text>
                </View>
                <View style={{
                    alignSelf: "flex-start", flexDirection: "row", height: "100%",
                    flexBasis: "47%", backgroundColor: "rgba(215,214,255,1.0)",
                    borderRadius: 10, paddingLeft: 5, paddingRight: 5, marginLeft: 5
                }}>
                    <Text style={{ alignSelf: "center", color: "#6F6CB0" }}>Próxima Actividade</Text>
                </View>
            </View>

            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: "row",
                maxHeight: "50%",
                padding: 10,
                backgroundColor: "white"
            }}>
                <View style={{
                    alignSelf: "flex-start", flexDirection: "row", height: "100%",
                    flexBasis: "100%", backgroundColor: "rgba(215,214,255,1.0)",
                    borderRadius: 10, paddingLeft: 10
                }}>
                    <Text style={{ alignSelf: "flex-start", textAlign: "center", color: "#6F6CB0" }}>Feed</Text>
                    <Text style={{ alignSelf: "center",  color: "#6F6CB0" }}>{token}</Text>
                    <Button title="increase" onPress={() => {dispatch(AttemptLogin("other7@gmail.com", "qwe123", setStatus))}}/>
                </View>
            </View>

            {/* <View style={styles.container}>
                <Text>This app test wifi network switching.</Text>
                <Text>Go to settings</Text>
                <Button title="Settings" onPress={changeToSettings} />
                <Button title="3D Vis" onPress={changeToVis} />
            </View> */}
        </>
    );
}

