
import * as THREE from "three"
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { useLoader, useFrame, Canvas, useThree, extend, ReactThreeFiber, useUpdate } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { View, Text, YellowBox, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera, CameraControls, DebugAngleGenerator } from "./3DViewResources"
import Model, { QuaternionCoorRefs } from "./Model"
import GradientButton from "../../Global/GradientButton";

YellowBox.ignoreWarnings(['THREE.WebGLRenderer']);

extend({ OrbitControls });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>,
        }
    }
}


interface CalibrationProps {
    updateRefPosition : Function
}

function SensorCalibration(props: CalibrationProps) {

    const [view, setView] = useState("calibration")

    return (

        <View style={{
            position: "absolute",
            backgroundColor: "#FFF",
            zIndex: view === "calibration" ? 98 : -98,
            width: "100%",
            height: "100%",
        }}>
            <View style={{
                flexDirection: "column",
                padding: 15,
                alignContent: "center",
                height: "100%",
                width: "100%"
            }}>
                <Image
                    source={require("../../../assets/images/calibration_position.png")}
                    style={{
                        alignSelf: "center",
                        width: "100%",
                        maxHeight: "80%",
                        resizeMode: "center"
                    }}
                />
                <Text
                    style={{
                        textAlign: "center",
                        width: "100%"
                    }}
                >
                    Coloque-se em posição com os sensores como na imagem
                    </Text>
                <GradientButton
                    title={"Definir Posição"}
                    onPress={() => {
                        props.updateRefPosition();
                        setView("exercise");
                    }}
                    buttonStyle={{ width: "100%", marginTop: 15, opacity: 10 }}
                    textStyle={{ fontSize: 13 }}
                />

            </View>

        </View>
    );
}

export default SensorCalibration;
