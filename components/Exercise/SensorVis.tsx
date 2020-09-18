import * as THREE from "three"
import React, { useEffect, useRef, useState, Suspense, useMemo } from "react"
import { useLoader, useFrame, Canvas, useThree, extend, ReactThreeFiber, useUpdate } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { View, Text, YellowBox } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import usePromise from "react-promise-suspense";

import {SERVICE_URL} from "../../constants"

// Import from jsm for smaller bundles and faster apps
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Asset } from 'expo-asset';

YellowBox.ignoreWarnings(['THREE.WebGLRenderer']);

extend({ OrbitControls });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>,
        }
    }
}


function lerp(v0: any, v1: any, t: any) {
    return v0 * (1 - t) + v1 * t
}

const getFontUrl = async () => {
    const asset = Asset.fromModule(require("../../assets/fonts/helvetiker_regular.typeface.json"));
    await asset.downloadAsync();

    return asset.localUri;
};

const getModelUrl = async () => {
    const asset = Asset.fromModule(require("../../assets/objects/BodyRigged.glb"));
    await asset.downloadAsync();

    console.log(asset)

    return asset.localUri;
};


//This methods provides the orbitControls, this object overrides several camera settings, 
//  therefore focus, position, rotation etc. of the camera has to be defined here
const CameraControls = (props: any) => {

    // Getting Threejs' elements
    const {
        camera,
        scene,
        gl: { domElement },
    } = useThree();

    //References so that state is maintained across frames since each frame is a run of this function
    const controls = useRef();
    const prevFocus = useRef("");

    useFrame((state) => {
        //console.log(camera.position)

        const position = new THREE.Vector3();               //Varible to store the in focus bone's position
        const object = scene?.getObjectByName(props.focus); //Getting the bone's (or any other) object from the scene
        //This method is required for parented objects, for example, a skeleton is a chained parent/child structure.
        // This mean that the object's position is defined by the parent's position/rotation, to get the actual 
        //  global position the method getWorldPosition needs to be called
        let objectpos = object?.getWorldPosition(position); //Getting the world position of the object. 

        if (!object) {
            camera.position.set(0, 0, 100);
            (controls.current as any).target.set(0, 0, 0);
        }
        else {
            //camera.position.set(object?.position.x, object?.position.y, 100);
            if (prevFocus.current !== props.focus) {
                camera.position.set(position.x, position.y, 150);
                (controls.current as any).target.set(position.x, position.y, position.z);
                prevFocus.current = props.focus;
            } else {
                (controls.current as any).target.set(position.x, position.y, position.z);
            }
        }
        return ((controls.current as any).update());
    })
    return <orbitControls ref={controls} args={[camera, domElement]} target={props.target} />;
};


function Degrees(props: any) {

    const mesh = useRef()

    const url = usePromise(getFontUrl, []);
    const font = useLoader(THREE.FontLoader, SERVICE_URL + "/fonts/helvetiker_regular.typeface.json");
    const config = useMemo(() => ({ font, size: 5, height: 1 }), [font])

    return (
        <mesh ref={mesh} rotation={[0, 0, -Math.PI / 2]} position={[-14, 5, 0]}>
            <textGeometry attach="geometry" args={[props.degree + "°", config]} />
            <meshStandardMaterial attach="material" color={'#a38be8'} side={THREE.DoubleSide} />
        </mesh>
    )
}



function AngleMarkers(props: any) {

    const {
        camera,
        scene,
        gl: { domElement },
    } = useThree();

    const controls = useRef();
    const group = useRef();

    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    let objectpos: any;
    let objectrot: any;
    let object = scene?.getObjectByName("Arm1");
    objectpos = object?.getWorldPosition(position);
    objectrot = object?.getWorldQuaternion(rotation);
    //rotation.setFromAxisAngle(new THREE.Vector3(1, 0, 0).normalize(), Math.PI/2);

    useFrame((state) => {
        const object = scene?.getObjectByName("Arm1");
        let objectpos = object?.getWorldPosition(position);
        let objectrot = object?.getWorldQuaternion(rotation);
        //rotation.setFromAxisAngle(new THREE.Vector3(1, 0, 0).normalize(), Math.PI/2);
        //console.log(rotation)

    })


    const innerRadius = 1;
    const outerRadius = 15;
    const thetaSegments = 24;
    const phiSegments = 2;
    const thetaStart = Math.PI / 2;
    const thetaLength = (Math.PI - THREE.MathUtils.degToRad(props.forearm));
    const geometry = new THREE.RingBufferGeometry(
        innerRadius, outerRadius,
        thetaSegments, phiSegments,
        thetaStart, thetaLength);


    return (
        <>
            <group ref={group} dispose={null} position={[position.x, position.y, position.z]} quaternion={[rotation.x, rotation.y, rotation.z, rotation.w]}>
                <mesh >
                    <ringBufferGeometry
                        attach="geometry"
                        args={[innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength]}
                    />


                    {/* <planeBufferGeometry
                        attach="geometry"
                    args={[20, 20]} /> */}
                    <meshStandardMaterial attach="material" color={'#5030af'} opacity={0.8} transparent side={THREE.DoubleSide} />
                </mesh>
                {/* <Degrees degree={props.forearm.toString()} /> */}
            </group>
        </>
    )
}

function moveJoint(amount: number, joint: any, degreeLimit = 40) {
    //let degrees = { x: Math.random() * 360, y: Math.random() * 360 }
    let degrees = { x: amount, y: amount, z: amount }
    joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.y, 1)
    joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.x, 1)
    //joint.rotation.xD = lerp(0, degrees.y, 0.1)
    //joint.rotation.yD = lerp(0, degrees.x, 0.1)
    joint.rotation.x = THREE.MathUtils.degToRad(joint.rotation.xD)
    joint.rotation.y = THREE.MathUtils.degToRad(joint.rotation.yD)
}


function Model({ ...props }) {
    //console.log("> MODEL RENDER")
    const group = useRef()
    const material = useRef()

    // const url = usePromise(getModelUrl, []);
    const loaded = useLoader(GLTFLoader, SERVICE_URL + "/objects/BodyRigged.glb");

    //const loaded = useLoader(GLTFLoader, "../../assets/objects/BodyRigged.glb")
    //console.log(loaded)

    const [object, bones, skeleton] = useMemo(() => {
        if (!(loaded as any).bones) (loaded as any).bones = loaded.scene.children[0].children[0];
        if (!(loaded as any).skeleton)
            (loaded as any).skeleton = (loaded.scene.children[0].children[1] as any).skeleton;
        if (!(loaded as any).object)
            (loaded as any).object = (loaded.scene.children[0] as any);
        //console.log("LOADER FINALIZED")
        return [(loaded as any).object, (loaded as any).bones, (loaded as any).skeleton];
    }, [loaded]);

    const nodes = (loaded as any).nodes

    useFrame((state, delta) => {
        moveJoint(props.arm, nodes.Arm0)
        moveJoint(props.forearm, nodes.Arm1)
    })

    return (
        <group ref={group} {...props} dispose={null}>
            {/* <group scale={[0.1, 0.1, 0.1]}> */}
            <primitive object={object} />
            <skinnedMesh geometry={nodes["Body_low"].geometry} skeleton={skeleton}>
                {/* <skeletonHelper args={object} /> */}
                <meshPhongMaterial ref={material} attach="material" color="#b3720a" skinning />
                {/* <meshPhongMaterial attach="material" map={texture} map-flipY={false} skinning /> */}
            </skinnedMesh>
            {/* </group> */}
        </group>
    )
}

function Camera(props: any) {
    const ref = useRef()
    const { setDefaultCamera } = useThree()
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera((ref as any).current), [])
    // Update it every frame
    useFrame(() => (ref as any).current.updateMatrixWorld())
    return <perspectiveCamera ref={ref} {...props} />
}


interface ExerciseProps {
    fullInterface: boolean
}


function DebugAngleGenerator(time: number) {

    const timeInterval = [0, 2 * 60]
    const angleInterval = [0, 80]

    var angle;
    var timeposition = time % (4 * 60);

    //if (timeposition <= (2 * 60))
    angle = angleInterval[0] + (((angleInterval[1] - angleInterval[0]) / (timeInterval[1] - timeInterval[0])) * (timeposition - timeInterval[0])) % angleInterval[1]
    //else if (timeposition > (2 * 60))
    //angle =  (angleInterval[0] + (((angleInterval[1] - angleInterval[0]) / (timeInterval[1] - timeInterval[0])) * (timeposition - timeInterval[0])))
    //else angle = 0

    //console.log("TIME: ", time)
    //console.log("TIMEPOSITION: ", timeposition)
    //console.log("ANGLE: ", angle)
    return Math.round(angle)
}

function Exercise(props: ExerciseProps) {

    //const arm = useRef(0)
    const [loading, setLoading] = useState(false)
    const [arm, setArm] = useState(0)
    const [forearm, setForearm] = useState(0)
    const [target, setTarget] = useState("Arm1")
    const [play, setPlay] = useState(false)
    const timer = useRef<any>()
    const [time, setTime] = useState(0)
    const tiker = useRef<number>(0)

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
            backgroundColor: "#FFF"
        }}>
            {loading ?
                <Text>A carregar visualização 3D ...</Text>
                :
                <></>
            }
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
                        <Model position={[0, 0, 0]} arm={arm} forearm={forearm} />
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

                {
                    !play ?
                        <TouchableOpacity onPress={() => { setPlay(true) }} >
                            <FontAwesomeIcon icon={faPlay} style={{ color: "#6C63FF", width: "25px" }} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => { setPlay(false) }} >
                            <FontAwesomeIcon icon={faPause} style={{ color: "#6C63FF", width: "25px" }} />
                        </TouchableOpacity>
                }
            </View>
        </View>
    );
}

export default Exercise;
