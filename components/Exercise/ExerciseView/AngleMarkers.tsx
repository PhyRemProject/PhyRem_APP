import * as THREE from "three"
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { useLoader, useFrame, Canvas, useThree, extend, ReactThreeFiber, useUpdate } from "react-three-fiber"

import usePromise from "react-promise-suspense";

import {SERVICE_URL} from "../../../constants"

function Degrees(props: any) {

    const mesh = useRef()

    const font = useLoader(THREE.FontLoader, SERVICE_URL + "/fonts/helvetiker_regular.typeface.json");
    const config = useMemo(() => ({ font, size: 5, height: 1 }), [font])

    return (
        <mesh ref={mesh} rotation={[0, 0, -Math.PI / 2]} position={[-14, 5, 0]}>
            <textGeometry attach="geometry" args={[props.degree + "°", config]} />
            <meshStandardMaterial attach="material" color={'#a38be8'} side={THREE.DoubleSide} />
        </mesh>
    )
}

export default function AngleMarkers(props: any) {

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
