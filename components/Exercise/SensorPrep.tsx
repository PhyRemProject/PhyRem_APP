import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Button, PermissionsAndroid } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import NetInfo from '@react-native-community/netinfo';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../Global/GradientButton';
import Spinner from 'react-native-spinkit';

import WifiManager from "react-native-wifi-reborn";

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

const SensorPrep = ({ navigation }: Props) => {

    const [modelReady, setModelStatus] = useState("waiting")
    const [permissionStatus, setPermissionStatus] = useState("waiting");
    const [connectionStatus, setConnectionStatus] = useState("idle");
    const [availConnections, setAvailConnections] = useState("");

    useEffect(() => {
        setTimeout(() => { setModelStatus("ready") }, 1600)
    }, [])

    useEffect(() => {
        if (modelReady === "ready")
            askForUserPermissions();
    }, [modelReady])

    useEffect(() => {
        if (permissionStatus === "granted")
            searchSensor();
    }, [permissionStatus])



    const searchSensor = () => {
        setConnectionStatus("searching")

        WifiManager.loadWifiList((wifiList) => {
            let wifiArray = JSON.parse(wifiList);
            setAvailConnections(wifiArray.map((value : any, index : number) => (value.SSID + "\n")))
        }, error => console.log("error: " + error))

        setConnectionStatus("connecting")
        WifiManager.connectToProtectedSSID("PhySensors", "classic123", false)
            .then(
                () => { setConnectionStatus("connected") }
            ).catch((err) => {
                setConnectionStatus("error : " + err);
                console.log(err)
            })


    }

    const askForUserPermissions = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Wifi networks',
                    'message': 'We need your permission in order to find wifi networks'
                } as any
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setPermissionStatus("granted")
                console.log("Thank you for your permission! :)");
            } else {
                setPermissionStatus("denied")
                console.log("You will not able to retrieve wifi available networks list");
            }
        } catch (err) {
            console.warn(err)
        }
    }

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
                    <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 22 }}>Ligando ao sensor...</Text>
                </View>
                <View style={{
                    flexDirection: "column",
                    paddingRight: 15,
                    paddingLeft: 15,
                    alignItems: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    paddingVertical: "30%",
                    height: "80%",
                    width: "50%",
                }}>
                    <View style={{
                        flexDirection: "row",
                    }}>
                        <Text
                            style={{
                                fontFamily: "Rawline",
                                color: "#333",
                                fontSize: 13,
                                alignSelf: "center",
                                width: "100%"
                            }}>
                            Carregando Modelo 3D
                        </Text>
                        {
                            modelReady === "waiting" ?
                                <Spinner isVisible={true} size={20} type={"Circle"} color={"#5954DB"} />
                                : modelReady === "ready" ?
                                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#00DD55", width: "35px" }} />
                                    :
                                    <FontAwesomeIcon icon={faTimesCircle} style={{ color: "#DD0055", width: "35px" }} />
                        }
                    </View>
                    <View style={{
                        flexDirection: "row",
                        paddingTop: 35,
                    }}>
                        <Text
                            style={{
                                fontFamily: "Rawline",
                                color: "#333",
                                fontSize: 13,
                                alignSelf: "center",
                                width: "100%"
                            }}>
                            Recebendo permissões
                        </Text>
                        {
                            permissionStatus === "waiting" ?
                                <Spinner isVisible={true} size={20} type={"Circle"} color={"#5954DB"} />
                                : permissionStatus === "granted" ?
                                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#00DD55", width: "35px" }} />
                                    :
                                    <FontAwesomeIcon icon={faTimesCircle} style={{ color: "#DD0055", width: "35px" }} />
                        }
                    </View>

                    <View style={{
                        flexDirection: "row",
                        paddingTop: 35,
                    }}>
                        <Text
                            style={{
                                fontFamily: "Rawline",
                                color: "#333",
                                fontSize: 13,
                                alignSelf: "center",
                                width: "100%"
                            }}>
                            Mudando de rede
                        </Text>
                        {
                            connectionStatus === "idle" ?
                                <Spinner isVisible={true} size={20} type={"Circle"} color={"#5954DB"} />
                                : connectionStatus === "searching" || connectionStatus === "connecting" || connectionStatus === "connected"?
                                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#00DD55", width: "35px" }} />
                                    :
                                    <FontAwesomeIcon icon={faTimesCircle} style={{ color: "#DD0055", width: "35px" }} />
                        }
                    </View>
                    <View style={{
                        flexDirection: "row",
                        paddingTop: 35,
                    }}>
                        <Text
                            style={{
                                fontFamily: "Rawline",
                                color: "#333",
                                fontSize: 13,
                                alignSelf: "center",
                                width: "100%"
                            }}>
                            Ligando ao sensor
                        </Text>
                        {
                            connectionStatus === "searching" || connectionStatus === "connecting" || connectionStatus === "idle" ?
                                <Spinner isVisible={true} size={20} type={"Circle"} color={"#5954DB"} />
                                : connectionStatus === "connected" ?
                                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#00DD55", width: "35px" }} />
                                    :
                                    <FontAwesomeIcon icon={faTimesCircle} style={{ color: "#DD0055", width: "35px" }} />
                        }
                    </View>

                    <Text
                        style={{
                            fontFamily: "Rawline",
                            color: "#333",
                            fontSize: 13,
                            alignSelf: "center",
                            width: "100%",
                            paddingTop: 35
                        }}>
                        Redes disponíveis:
                        </Text>


                    <Text
                        style={{
                            fontFamily: "Rawline",
                            color: "#333",
                            fontSize: 13,
                            alignSelf: "center",
                            width: "100%"
                        }}>
                        {availConnections}
                    </Text>

                    <GradientButton
                                        title={"Continuar (DEBUG)"}
                                        onPress={() => { navigation.navigate("ExerciseView");}}
                                        buttonStyle={{ width: "100%", marginTop: 30 }}
                                        textStyle={{ fontSize: 13 }}
                                    />

                </View>
            </View>
        </>
    );
}


export default SensorPrep;