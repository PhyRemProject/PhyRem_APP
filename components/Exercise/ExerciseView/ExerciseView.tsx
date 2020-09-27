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
    const [loading, setLoading] = useState(true)
    const [arm, setArm] = useState(0)
    const [forearm, setForearm] = useState(0)
    const [target, setTarget] = useState("Arm1")
    const [play, setPlay] = useState(false)
    const timer = useRef<any>()
    const [time, setTime] = useState(0)
    const tiker = useRef<number>(0)
    const [updateTimes, update] = useState(1);


    //js websocket
    var ws;

    const x = useRef(0.0)
    const y = useRef(0.0)
    const z = useRef(0.0)
    const w = useRef(1.0)

    var originx = useRef(0.000);
    var originy = useRef(0.000);
    var originz = useRef(0.000);
    var originw = useRef(1.000);

    const DEBUG = false

    function initConnection() {
        console.log("initializing")
        do
            ws = new WebSocket('ws:192.168.4.1:1337')
        while (!ws)

        if (ws) {
            console.log("connected to sensor!asda");

            ws.onmessage = function (evt) {
                const [newW, newX, newY, newZ] = evt.data.split('\t');
                w.current = parseFloat(newW)
                x.current = parseFloat(newX)
                y.current = parseFloat(newY)
                z.current = parseFloat(newZ)
                //console.log('x: ' + newX + ' y: ' + newY + ' z: ' + newZ + ' w: ' + newW  )
            }
        }
    }

    const angle = useRef(0);


    useEffect(() => {
        if (props.systemStatus === "exercise")
            initConnection();
    }, [props.systemStatus]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 700)
    }, [])


    useEffect(() => {
        if (play && tiker.current <= (30 * 60 - 1)) {
            const id = setInterval(() => {
                tiker.current += 1
                setTime(tiker.current)
                setForearm(DebugAngleGenerator(tiker.current))
                //DebugAngleGenerator(tiker.current)
                //console.log(time)
            }, 17);

            timer.current = id;
        }
        else {
            clearInterval(timer.current as any);
        }

    }, [play])

    return (
        <View style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: "column",
            backgroundColor: "#FFF",
            zIndex: -1
        }}>
            <View style={{
                flexDirection: "row",
                padding: 15,
                alignContent: "center",
                height: "80%",
                width: "100%",
            }}>

                <Canvas>
                    <Camera />
                    <CameraControls focus={target} />
                    <ambientLight />
                    <pointLight position={[40, 40, 40]} />
                    <pointLight position={[-40, -40, -40]} />
                    <Suspense fallback={null}>
                        {/* <AngleMarkers forearm={forearm} /> */}
                        <Model 
                        position={[0, 0, 0]} 
                        origin={{
                            x : originx,
                            y : originy,
                            z : originz,
                            w : originw
                        } as QuaternionCoorRefs}
                        arm={{ x, y, z, w } as QuaternionCoorRefs} 
                        forearm={forearm} 
                        setStatus={props.modelStatus} 
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
                    onPress={() => { 
                        originw.current = w.current
                        originx.current = x.current
                        originy.current = y.current
                        originz.current = z.current
                        update(updateTimes + 1)
                        console.log("ResetPos")
                     }}
                    buttonStyle={{ width: "100%", marginTop: 30, opacity: 10 }}
                    textStyle={{ fontSize: 13 }}
                />

            </View>
            <View style={{
                flexDirection: "row",
                padding: 15,
                alignContent: "center",
                height: "10%",
                width: "100%"
            }}>
                <Text></Text>
            </View>
        </View>
    );
}

export default ExerciseView;
