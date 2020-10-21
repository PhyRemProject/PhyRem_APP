import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { Text, View } from "react-native";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import NetInfo from '@react-native-community/netinfo';
import WifiManager, { connectToSSID } from "react-native-wifi-reborn";
import {SendExercise} from "../ExerciseActions";
import { useSelector } from "react-redux";
import UserReducer from "../../User/UserReducer";

export interface ExerciseEnd {
    prevSSID: string,
    savedQuatern: React.MutableRefObject<Object[]>
}

function ExerciseEnd(props: ExerciseEnd) {

    const [connectionStatus, setConnectionStatus] = useState("waiting")
    const [status, setStatus] = useState("idle");
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string

    const reconnectToLAN = () => {

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
        if(connectionStatus === "connected")
            SendExercise(token, props.savedQuatern, setStatus);
    }, [connectionStatus])

    return (

        <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#FFF",
        }}>

            <Text style={{ textAlign: "center", width: "100%" }}>
                Aguarde envio do exercicio...
            </Text>

            {
                connectionStatus === "waiting" ?
                    <Text style={{ textAlign: "center", width: "100%" }}>
                        A repor ligação a: {props.prevSSID}
                    </Text> :
                    connectionStatus === "connected" ?
                        <Text style={{ textAlign: "center", width: "100%" }}>
                            A submeter ...
                        </Text> : <></>
            }
        </View>
    );
}

export default ExerciseEnd;
