import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { Text, View } from "react-native";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import NetInfo from '@react-native-community/netinfo';
import WifiManager, { connectToSSID } from "react-native-wifi-reborn";
import { SendExercise } from "../ExerciseActions";
import { useDispatch, useSelector } from "react-redux";
import UserReducer, { ADD_PROGRESS } from "../../User/UserReducer";
import GradientButton from "../../Global/GradientButton";
import { useNavigation } from '@react-navigation/native';

export interface ExerciseEnd {
    prevSSID: string,
    savedQuatern: React.MutableRefObject<Object[]>
}

function ExerciseEnd(props: ExerciseEnd) {

    const [connectionStatus, setConnectionStatus] = useState("connected")
    const [status, setStatus] = useState("idle");
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const reconnectToLAN = () => {
        if (props.prevSSID === "PhySensors")
            return
        else
            WifiManager.disconnect();
        WifiManager.connectToProtectedSSID(props.prevSSID, "", false)
            .then(
                () => { setConnectionStatus("connected") }
            ).catch((err) => {
                setConnectionStatus("error");
                console.log(err)
            })

    }

    useEffect(() => {
        reconnectToLAN()
    }, [])

    useEffect(() => {
        if (connectionStatus === "connected") {
            console.log("waiting")
            setTimeout(() => {
                console.log("submiting")
                SendExercise(token, props.savedQuatern, setStatus);
            }, 100)

        }
    }, [connectionStatus])


    useEffect(() => {
        if (status === "success") {
            dispatch(() => (dispatch({
                type: ADD_PROGRESS
            })));
        }
    }, [status])

    return (

        <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#FFF",
        }}>


            {
                status !== "success" ?
                <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", textAlign: "center", width: "100%", marginTop: "30%" }}>
                    Por favor, aguarde envio do exercicio...
                </Text>
                :
                <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", textAlign: "center", width: "100%", marginTop: "30%" }}>
                    Concluído!
                </Text>
            }

            {
                status === "failed" || status === "systemFail" ?
                    <GradientButton
                        title={"Tentar Novamente"}
                        onPress={() => {
                            setConnectionStatus("waiting")
                            reconnectToLAN()
                        }}
                        buttonStyle={{ width: "100%", marginTop: 60, opacity: 10 }}
                        textStyle={{ fontSize: 13 }}
                    />
                    :
                    status === "success" ?
                        <>
                            <FontAwesomeIcon 
                            icon={faCheckCircle} 
                            style={{ color: "#00DD55", width: "200px", alignSelf: "center", margin: 30 }} 
                            size={90}/>
                            <GradientButton
                                title={"Voltar ao Início"}
                                onPress={() => {
                                    navigation.navigate("Dashboard")
                                }}
                                buttonStyle={{ width: "80%", marginTop: 60, opacity: 10, alignSelf: "center" }}
                                textStyle={{ fontSize: 13 }}
                            />
                        </>
                        :
                        <></>
            }

            {
                connectionStatus === "waiting" ?
                    <Text style={{ textAlign: "center", width: "100%", marginTop: 30 }}>
                        A repor ligação a: {props.prevSSID}
                    </Text> :
                    connectionStatus === "connected" && status !== "success" ?
                        <Text style={{ textAlign: "center", width: "100%", marginTop: 30 }}>
                            A submeter ...
                        </Text> : <></>
            }
        </View>
    );
}

export default ExerciseEnd;
