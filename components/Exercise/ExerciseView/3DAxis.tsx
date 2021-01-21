import * as THREE from "three"
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { useLoader, useFrame, Canvas, useThree, extend, ReactThreeFiber, useUpdate } from "react-three-fiber"
import usePromise from "react-promise-suspense";

import { SERVICE_URL } from "../../../constants"

// Import from jsm for smaller bundles and faster apps
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Asset } from 'expo-asset';
import { Euler } from "three";

export interface QuaternionCoorRefs {
    x: React.MutableRefObject<number>,
    y: React.MutableRefObject<number>,
    z: React.MutableRefObject<number>,
    w: React.MutableRefObject<number>
}

const Axis = ({ ...props }) => {

    // var xgeometry = new THREE.BoxGeometry(4, 0.05, 0.05);
    // var xmaterial = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xff0000, } as any);
    // const xaxis = new THREE.Mesh(xgeometry, xmaterial);
    // const xaxisRef = useRef<THREE.Mesh>()

    var ygeometry = new THREE.BoxGeometry(0.001, 1, 0.001);
    var ymaterial = new THREE.MeshBasicMaterial({ wireframe: false, color: 0x00ff00, } as any);
    const yaxis = new THREE.Mesh(ygeometry, ymaterial);
    //const yaxisRef = useRef<THREE.Mesh>()

    // var zgeometry = new THREE.BoxGeometry(0.05, 0.05, 4);
    // var zmaterial = new THREE.MeshBasicMaterial({ wireframe: false, color: 0x0000ff,} as any);
    // const zaxis = new THREE.Mesh(zgeometry, zmaterial);
    // const zaxisRef = useRef<THREE.Mesh>()


    return (
        <group ref={props.object} {...props} dispose={null}>
            {/* <primitive object={xaxis} ref={xaxisRef} position={[0, 0, 0]} dispose={null} /> */}
            <primitive object={yaxis} ref={props.axis} position={[0, 0, 0]} dispose={null} />
            {/* <primitive object={zaxis} ref={zaxisRef} position={[0, 0, 0]} dispose={null} /> */}
        </group>
    )
}


export const SingleAxis = ({ ...props }) => {

    // var xgeometry = new THREE.BoxGeometry(4, 0.1, 0.1);
    // var xmaterial = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xff0000, } as any);
    // const xaxis = new THREE.Mesh(xgeometry, xmaterial);
    // const xaxisRef = useRef<THREE.Mesh>()

    var ygeometry = new THREE.BoxGeometry(0.1, 4, 0.1);
    var ymaterial = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xaa11dd, } as any);
    const yaxis = new THREE.Mesh(ygeometry, ymaterial);
    const yaxisRef = useRef<THREE.Mesh>()

    // var zgeometry = new THREE.BoxGeometry(0.1, 0.1, 4);
    // var zmaterial = new THREE.MeshBasicMaterial({ wireframe: false, color: 0x0000ff, } as any);
    // const zaxis = new THREE.Mesh(zgeometry, zmaterial);
    // const zaxisRef = useRef<THREE.Mesh>()


    return (
        <group ref={props.object} {...props} dispose={null}>
            {/* <primitive object={xaxis} ref={xaxisRef} position={[0, 0, 0]} dispose={null} /> */}
            <primitive object={yaxis} ref={yaxisRef} position={[0, 0, 0]} dispose={null} />
            {/* <primitive object={zaxis} ref={zaxisRef} position={[0, 0, 0]} dispose={null} /> */}
        </group>
    )
}


export default Axis;
