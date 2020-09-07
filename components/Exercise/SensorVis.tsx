import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    Text,
    View,
    PermissionsAndroid,
    Dimensions,
    StyleSheet
} from 'react-native';

import {
    Button,
    Icon
} from 'react-native-elements';

import { Canvas, useFrame, ReactThreeFiber } from 'react-three-fiber'

export default function SensorVis({navigation}) {

    // window.performance.clearMeasures = () => { }
    // window.performance.clearMarks = () => { }
    // window.performance.measure = () => { }
    // window.performance.mark = () => { }

    //Component Styling
    //let {styles} = route.params;
    //let styles = props.styles;
    //let goBack = props.goBack;
    //var width = Dimensions.get('window').width; //full width
    //var height = Dimensions.get('window').height; //full height

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    //////////////////////////////////////SENSORS ///////////////////////////////////////
    //Sensor connnection variables
    const [connectionStatus, setConnectionStatus] = useState("disconnected");
    //Sensor data is: (yaw, pitch, roll) angles
    //const [yaw, setYaw] = useState(0.0);
    const [pitch, setPitch] = useState(0.0);
    const [roll, setRoll] = useState(0.0);
    const yaw = useRef(0)

    //js websocket
    var ws;

    const DEBUG = true;

    function initConnection() {
        console.log("initializing")
        do
            ws = new WebSocket('ws:192.168.4.1:1337')
        while (!ws)

        if (ws) {
            console.log("connected to sensor!");
            setConnectionStatus("connected");

            ws.onmessage = function (evt) {
                const [yaw, pitch, roll] = evt.data.split('\t');
                yaw.current = yaw
                //setYaw(yaw)
                setPitch(pitch)
                setRoll(roll)
            }
        }
    }

    const [ye, setye] = useState(0)

    const angle = useRef(0);


    useEffect(() => {
        if (!DEBUG)
            initConnection();
    }, []);

    useEffect(() => {
        if (DEBUG) {
            const interval = setInterval(
                () => {
                    yaw.current += 0.1;
                    console.log("updated yaw: ", yaw);
                }, 100);
            return () => clearInterval(interval)
        }
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////

    const Box = (props) => {

        // This reference will give us direct access to the mesh
        const meshRef = useRef<THREE.Mesh>(null)

        // Set up state for the hovered and active state
        const [hovered, setHover] = useState(false)
        const [active, setActive] = useState(false)

        // Rotate mesh every frame, this is outside of React without overhead
        useFrame(() => {
            meshRef.current.rotation.x = roll
            meshRef.current.rotation.y = yaw.current
            meshRef.current.rotation.z = pitch
        })

        return (
            <mesh
                {...props}
                ref={meshRef}
                scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
                onClick={e => setActive(!active)}
                onPointerOver={e => setHover(true)}
                onPointerOut={e => setHover(false)} >
                <boxBufferGeometry attach="geometry" args={[2, 0.5, 1]} />
                <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
            </mesh>
        )
    }

    console.log(styles.container)

    return (
        < View style={styles.container} >
            <Icon
                raised
                name="arrow-left"
                type="font-awesome"
                size={15}
                color="black"
                onPress={() => { }}
            />

            <Text>3D Vis</Text>
            <Text>Sensor Data</Text>
            <Text>Connection status: {connectionStatus}</Text>
            <Text>Yaw: {yaw.current}</Text>
            <Text>Pitch: {pitch}</Text>
            <Text>Roll: {roll}</Text>

            <View  style={{height: 500, width: 500}}>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Box position={[0, 0, 0]} />
                </Canvas>
            </View>


        </View >
    );
}










// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//     Text,
//     View,
//     PermissionsAndroid,
//     Dimensions
// } from 'react-native';

// import {
//     Button,
//     Icon
// } from 'react-native-elements';

// import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
// import ExpoTHREE from 'expo-three';

// import * as THREE from 'three';
// import { Mesh } from 'three';


// export default function SensorVis(props) {

//     const [connectionStatus, setConnectionStatus] = useState("disconnected");

//     //Sensor data is: (yaw, pitch, roll) angles
//     const [sensorData, setSensorData] = useState([0.0,0.0,0.0]);

//     //js websocket
//     var ws;

//     let styles = props.styles;
//     let goBack = props.goBack;

//     let renderer, globalGL;


//     var width = Dimensions.get('window').width; //full width
//     var height = Dimensions.get('window').height; //full height

//     let timeout;

//     useEffect(() => {
//         // Clear the animation loop when the component unmounts
//         return () => clearTimeout(timeout);
//     }, []);


//     function initConnection() {
//         do
//             ws = new WebSocket('ws:192.168.4.1:1337')
//         while (!ws)

//         if (ws) {
//             console.log("connected to sensor!");
//             setConnectionStatus("connected");

//             ws.onmessage = function (evt) {
//                setSensorData(evt.data.split('\t'));
//             }
//         }
//     }

//     useEffect(() => {
//         initConnection();
//     }, []);

//     useEffect(() => {
//         if(!renderer)
//             return
//         console.log("New Scene")

//         const { drawingBufferWidth: width, drawingBufferHeight: height } = globalGL;
//         const sceneColor = 0xffffff;

//         // Create a WebGLRenderer without a DOM element
//         renderer.setSize(width, height);
//         renderer.setClearColor(sceneColor);


//         const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
//         camera.position.set(2, 5, 5);

//         const scene = new THREE.Scene();

//         const ambientLight = new THREE.AmbientLight(0x101010);
//         scene.add(ambientLight);

//         const cube = new IconMesh();
//         scene.add(cube);

//         camera.lookAt(cube.position);

//         function update() {
//             objectRotation(cube, sensorData[0], sensorData[1] , sensorData[2]);
//             //rotateObject(cube, 2, 2 , 2 );
//         }

//         // Setup an animation loop
//         const render = () => {
//             console.log("render(), " + sensorData)
//             timeout = requestAnimationFrame(render);
//             update();
//             renderer.render(scene, camera);
//             globalGL.endFrameEXP();
//         };
//         render();
//     }, [sensorData])

//     function objectRotation(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
//         object.rotation.x = (THREE.MathUtils.degToRad(degreeX));
//         object.rotation.y = (THREE.MathUtils.degToRad(degreeY));
//         object.rotation.z = (THREE.MathUtils.degToRad(degreeZ));
//     }

//     function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
//         (object as THREE.Mesh).rotateX(THREE.MathUtils.degToRad(degreeX));
//         (object as THREE.Mesh).rotateY(THREE.MathUtils.degToRad(degreeY));
//         (object as THREE.Mesh).rotateZ(THREE.MathUtils.degToRad(degreeZ));

//     }

//     var newScene = (gl: ExpoWebGLRenderingContext, newSensorData) => {

//         console.log("New Scene")

//         const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
//         const sceneColor = 0xffffff;

//         // Create a WebGLRenderer without a DOM element
//         renderer.setSize(width, height);
//         renderer.setClearColor(sceneColor);


//         const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
//         camera.position.set(2, 5, 5);

//         const scene = new THREE.Scene();

//         const ambientLight = new THREE.AmbientLight(0x101010);
//         scene.add(ambientLight);

//         const cube = new IconMesh();
//         scene.add(cube);

//         camera.lookAt(cube.position);

//         function update() {
//             objectRotation(cube, newSensorData[0], newSensorData[1] , newSensorData[2]);
//             //rotateObject(cube, 2, 2 , 2 );
//         }

//         // Setup an animation loop
//         const render = () => {
//             console.log("render(), " + newSensorData)
//             timeout = requestAnimationFrame(render);
//             update();
//             renderer.render(scene, camera);
//             gl.endFrameEXP();
//         };
//         render();
//     };

//     console.log("component render ", sensorData)




//     return (

//         <View style={styles.container}>
//             <Icon
//                 raised
//                 name="arrow-left"
//                 type="font-awesome"
//                 size={15}
//                 color="black"
//                 onPress={goBack} />

//             <Text>3D Vis</Text>
//             <Text>Sensor Data</Text>
//             <Text>Connection status: {connectionStatus}</Text>
//             <Text>{sensorData}</Text>
//             <Text>Yaw: {sensorData[0]}</Text>
//             <Text>Pitch: {sensorData[1]}</Text>
//             <Text>Roll: {sensorData[2]}</Text>

//             <GLView
//                 style={{ flex: 1, width, height }}
//                 onContextCreate={(gl) => {
//                     renderer = new ExpoTHREE.Renderer({ gl });
//                     globalGL = gl
//                 }}
//             />

//         </View>
//     );
// }

// class IconMesh extends THREE.Mesh {
//     constructor() {

//         var geometry = new THREE.BoxGeometry(2.0, 0.5, 1.0);
//         for (var i = 0; i < geometry.faces.length; i++) {
//             geometry.faces[i].color.setHex(i * 0.1 * 0xffffff);
//         }

//         var material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true });

//         super(
//             geometry,
//             material,
//         );
//     }


// }