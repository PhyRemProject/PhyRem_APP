import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { Text, View } from "react-native";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface AngleProgress {
    angleRef: React.MutableRefObject<string>,
    
}

function AngleProgress(props: AngleProgress) {

    const [display, setDisplay] = useState("Angle")
    const [firstTarget, setFirstTarget] = useState(false)
    const [complete, setComplete] = useState(false)
    const [progress, setProgress] = useState("0%")



    const convertProgress = () => {
        let prog = (((parseFloat(props.angleRef.current) - 0) * 100) / 145) + 0
        setProgress(prog + "%")
    }

    useEffect(() => {
        const id = setInterval(() => {
            setDisplay(parseFloat(props.angleRef.current).toFixed(1))
            convertProgress();
            if (parseFloat(props.angleRef.current) > 90)
                setFirstTarget(true)
            if (parseFloat(props.angleRef.current) > 130)
                setComplete(true)

        }, 77)
    }, [])

    //console.log(savedQuaterns.length)

    return (

        <View style={{
            width: "100%",
            height: "100%",
            marginTop: "-15%"
        }}>
            <View style={{
                maxWidth: "100%",
                height: 30,
                backgroundColor: "#DDD"
            }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{
                    display: firstTarget ? "flex" : "none",
                    height: 20,
                    marginTop: -2,
                    marginLeft: "57%",
                    zIndex: 2
                }} size={35} color={"#00DD55"}></FontAwesomeIcon>
                <Text style={{
                    position: "absolute",
                    zIndex: 3,
                    marginTop: -22,
                    marginLeft: "59%",
                }}>
                    90º
                </Text>
                <FontAwesomeIcon icon={faCheckCircle} style={{
                    display: complete ? "flex" : "none",
                    height: 20,
                    marginTop: -45,
                    marginLeft: "87%",
                    zIndex: 2
                }} size={50} color={"#00DD55"} />
                <View style={{
                    position: "absolute",
                    width: progress,
                    height: 30,
                    backgroundColor: "#0F0",
                    zIndex: 1
                }}>
                </View>
            </View>
            <Text style={{
                color: "#333",
                fontSize: 40,
                width: "100%",
                paddingTop: 30,
                textAlign: "center"
            }}>
                {display}º
                </Text>
        </View>
    );
}

export default AngleProgress;
