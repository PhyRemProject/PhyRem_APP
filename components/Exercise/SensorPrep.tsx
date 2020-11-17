import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Button, PermissionsAndroid, YellowBox} from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import GradientButton from '../Global/GradientButton';
import Spinner from 'react-native-spinkit';

import WifiManager from "react-native-wifi-reborn";
import ExerciseView from './ExerciseView/ExerciseView';
import ErrorBoundary from '../Global/ErrorBoundary';
import SensorCalibration from './ExerciseView/SensorCalibration';

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

YellowBox.ignoreWarnings(['Render methods']);

const SensorPrep = ({ navigation }: Props) => {

    const [modelReady, setModelStatus] = useState("waiting")
    const [permissionStatus, setPermissionStatus] = useState("waiting");
    const [connectionStatus, setConnectionStatus] = useState("idle");
    const [view, setView] = useState("sensorPrep")
    const [lastSSID, setLastSSID] = useState("")

    // useEffect(() => {
    //     setTimeout(() => { setModelStatus("ready") }, 1600)
    // }, [])

    useEffect(() => {
        if (modelReady === "ready")
            askForUserPermissions();
    }, [modelReady])

    useEffect(() => {
        if (permissionStatus === "granted")
            searchSensor();
    }, [permissionStatus])

    const defaultErrorHandler = ErrorUtils.getGlobalHandler()
    const myErrorHandler = (e: any, isFatal: any) => {
        setModelStatus("error")
        defaultErrorHandler(e, isFatal)
    }
    ErrorUtils.setGlobalHandler(myErrorHandler)


    const searchSensor = () => {
        //DEBUG
        // WifiManager.loadWifiList((wifiList) => {
        //     let wifiArray = JSON.parse(wifiList);
        //     setAvailConnections(wifiArray.map((value : any, index : number) => (value.SSID + "\n")))
        // }, error => console.log("error: " + error))

        setConnectionStatus("connecting")
        WifiManager.getCurrentWifiSSID()
            .then((ssid: string) => {
                setLastSSID(ssid)
            }).catch((err) => {
                console.log("Retrieving SSID failed")
            })

        WifiManager.connectToProtectedSSID("PhySensors", "classic123", false)
            .then(
                () => { setConnectionStatus("connected") }
            ).catch((err) => {
                setConnectionStatus("error");
                console.log(err)
            })
    }

    const askForUserPermissions = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Ligação ao sensor',
                    'message': 'Precisamos que autorize o acesso à localização do dispositivo para poder ligar ao sensor'
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

    console.log(view)
    return (
        <>
            <View style={{
                position: "absolute",
                backgroundColor: "#FFF",
                zIndex: view === "sensorPrep" ? 99 : -99,
                width: "100%",
                height: "100%",
            }}>
                <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: "column",
                    backgroundColor: "#FFF",
                    height: "100%",
                    width: "100%",
                    zIndex: 99
                }}>
                    <View style={{
                        flexDirection: "row",
                        padding: 15,
                        alignContent: "center",
                        height: "12%",
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
                        paddingVertical: "15%",
                        height: "80%",
                        width: "100%",
                    }}>
                        <View style={{
                            flexDirection: "row",
                            width: "50%"
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
                            width: "50%"
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
                            width: "50%"
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
                                connectionStatus === "connecting" || connectionStatus === "idle" ?
                                    <Spinner isVisible={true} size={20} type={"Circle"} color={"#5954DB"} />
                                    : connectionStatus === "connected" ?
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#00DD55", width: "35px" }} />
                                        :
                                        <FontAwesomeIcon icon={faTimesCircle} style={{ color: "#DD0055", width: "35px" }} />
                            }
                        </View>

                        <View style={{
                            flexDirection: "column",
                            paddingTop: 35,
                            width: "100%"
                        }}>
                            {
                                connectionStatus === "error" || modelReady === "error" || permissionStatus === "denied" ?
                                    <Text
                                        style={{
                                            fontFamily: "Rawline-Bold",
                                            color: "#333",
                                            fontSize: 13,
                                            alignSelf: "center",
                                            width: "100%"
                                        }}>
                                        Ocorreu um erro!
                                    </Text>
                                    :
                                    <></>
                            }
                            {
                                modelReady === "error" ?
                                    <Text
                                        style={{
                                            fontFamily: "Rawline",
                                            color: "#333",
                                            fontSize: 13,
                                            alignSelf: "center",
                                            width: "100%"
                                        }}>
                                        Verifique que tem uma ligação à internet
                                    </Text>
                                    : permissionStatus === "denied" ?
                                        <Text
                                            style={{
                                                fontFamily: "Rawline",
                                                color: "#333",
                                                fontSize: 13,
                                                alignSelf: "center",
                                                width: "100%"
                                            }}>
                                            Por favor permita que se possa aceder à localização do dispositivo
                                    </Text>
                                        :
                                        connectionStatus === "error" ?
                                            <>
                                                <Text
                                                    style={{
                                                        fontFamily: "Rawline",
                                                        color: "#333",
                                                        fontSize: 13,
                                                        alignSelf: "center",
                                                        width: "100%"
                                                    }}>
                                                    {'Verifique que o sensor está ligado\n\nConfirme que tem a localização do dispositivo ligada'}
                                                </Text>
                                                <GradientButton
                                                    title={"Tentar Novamente"}
                                                    onPress={() => { searchSensor() }}
                                                    buttonStyle={{ width: "100%", marginTop: 30 }}
                                                    textStyle={{ fontSize: 13 }}
                                                />
                                            </>
                                            :
                                            <></>
                            }
                        </View>

                        {
                            connectionStatus === "connected" ?
                                <GradientButton
                                    title={"Iniciar Exercício"}
                                    onPress={() => { setView("calibration") }}
                                    buttonStyle={{ width: "100%", marginTop: 30, opacity: 10 }}
                                    textStyle={{ fontSize: 13 }}
                                />
                                :
                                <></>
                        }


                        <GradientButton
                            title={"Continuar (DEBUG)"}
                            onPress={() => { setView("calibration") }}
                            buttonStyle={{ width: "100%", marginTop: 30, opacity: 10 }}
                            textStyle={{ fontSize: 13 }}
                        />

                    </View>
                </View>
            </View>

            <ErrorBoundary>
                <ExerciseView modelStatus={setModelStatus} systemStatus={view} lastSSID={lastSSID} />
            </ErrorBoundary>
        </>
    );
}


export default SensorPrep;