import * as THREE from "three"
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { useLoader, useFrame, Canvas, useThree, extend, ReactThreeFiber, useUpdate } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { View, Text, YellowBox } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera, CameraControls, DebugAngleGenerator } from "./3DViewResources"
import Model, { QuaternionCoorRefs } from "./Model"
import GradientButton from "../../Global/GradientButton";
import SensorCalibration from "./SensorCalibration";
import AngleProgress from "./AngleProgress";

YellowBox.ignoreWarnings(['THREE.WebGLRenderer']);

extend({ OrbitControls });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>,
        }
    }
}


interface ExerciseProps {
    modelStatus: Function,
    systemStatus: string
}

function ExerciseView(props: ExerciseProps) {

    //const arm = useRef(0)
    const [target, setTarget] = useState("Arm1")
    
    const angle = useRef<string>("Angle")

    //js websocket
    var ws;

    const armX = useRef(0.0)
    const armY = useRef(0.0)
    const armZ = useRef(0.0)
    const armW = useRef(1.0)

    const forearmX = useRef(0.0)
    const forearmY = useRef(0.0)
    const forearmZ = useRef(0.0)
    const forearmW = useRef(1.0)

    var armOX = useRef(0.000);
    var armOY = useRef(0.000);
    var armOZ = useRef(0.000);
    var armOW = useRef(1.000);

    var forearmOX = useRef(0.000);
    var forearmOY = useRef(0.000);
    var forearmOZ = useRef(0.000);
    var forearmOW = useRef(1.000);

    const DEBUG = false

    function initConnection() {
        console.log("initializing")
        do
            ws = new WebSocket('ws:192.168.4.1:1337')
        while (!ws)

        if (ws) {
            console.log("connected to sensor!");

            ws.onmessage = function (evt) {
                let readings = evt.data.split('\r');
                const [deviceNumb, newW, newX, newY, newZ, deviceNumb2, newW2, newX2, newY2, newZ2] = evt.data.split('\t');

                //Remove the last \r
                readings.pop();
                const numOfDevices = readings.length;

                //console.log(JSON.stringify(readings))
                let sensor1 = readings[0];
                sensor1 = sensor1.split('\t');

                let sensor2 = null;
                if (numOfDevices > 1) {
                    sensor2 = readings[1];
                    sensor2 = sensor2.split('\t');
                    sensor2.splice(0, 1);
                }

                //console.log(sensor1)
                //console.log(sensor2)

                armX.current = parseFloat(sensor1[1])
                armY.current = parseFloat(sensor1[2])
                armZ.current = parseFloat(sensor1[3])
                armW.current = parseFloat(sensor1[4])
                forearmX.current = parseFloat(sensor2[1])
                forearmY.current = parseFloat(sensor2[2])
                forearmZ.current = parseFloat(sensor2[3])
                forearmW.current = parseFloat(sensor2[4])
            }
        }
    }

    const updateRefPosition = () => {
        armOX.current = armX.current
        armOY.current = armY.current
        armOZ.current = armZ.current
        armOW.current = armW.current
        forearmOX.current = forearmX.current
        forearmOY.current = forearmY.current
        forearmOZ.current = forearmZ.current
        forearmOW.current = forearmW.current
        //update(updateTimes + 1)
        console.log("ResetPos")
        console.log([
            armOX.current,
            armOY.current,
            armOZ.current,
            armOW.current,
            forearmOX.current,
            forearmOY.current,
            forearmOZ.current,
            forearmOW.current
        ])
    }

    useEffect(() => {
            initConnection();
    }, [props.systemStatus]);


    useEffect(() => {
        const id = setInterval(() => {
            angle.current = angle.current + 1;
        }, 500)
    }, [])

    return (
        <>
            <SensorCalibration updateRefPosition={updateRefPosition}/>
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: "column",
                backgroundColor: "#FFF",
                zIndex: -1,
                width: "100%",
                height: "100%"
            }}>
                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    alignContent: "center",
                    height: "70%",
                    width: "100%",
                }}>

                    <Canvas>
                        <Camera position={[-150, 30, 0]} />
                        <CameraControls focus={target} />
                        <ambientLight />
                        <pointLight position={[40, 40, 40]} />
                        <pointLight position={[-40, -40, -40]} />
                        <Suspense fallback={null}>
                            {/* <AngleMarkers forearm={forearm} /> */}
                            <Model
                                position={[0, 0, 0]}
                                armOrigin={{
                                    x: armOX,
                                    y: armOY,
                                    z: armOZ,
                                    w: armOW
                                } as QuaternionCoorRefs}
                                arm={{
                                    x: armX,
                                    y: armY,
                                    z: armZ,
                                    w: armW
                                } as QuaternionCoorRefs}
                                forearmOrigin={{
                                    x: forearmOX,
                                    y: forearmOY,
                                    z: forearmOZ,
                                    w: forearmOW
                                } as QuaternionCoorRefs}
                                forearm={{
                                    x: forearmX,
                                    y: forearmY,
                                    z: forearmZ,
                                    w: forearmW
                                } as QuaternionCoorRefs}
                                setStatus={props.modelStatus}
                                currenAngleRef={angle}
                            />
                        </Suspense>
                    </Canvas>
                </View>
                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    alignContent: "center",
                    height: "15%",
                    width: "100%"
                }}>
                    <GradientButton
                        title={"Reset Pos"}
                        onPress={updateRefPosition}
                        buttonStyle={{ width: "100%", marginTop: 30, opacity: 10 }}
                        textStyle={{ fontSize: 13 }}
                    />

                </View>
                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    alignContent: "center",
                    height: "15%",
                    width: "100%"
                }}>
                    <AngleProgress angleRef={angle}/>
                </View>
            </View>
        </>
    );
}

export default ExerciseView;
