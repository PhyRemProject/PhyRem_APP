import * as THREE from "three"
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { useLoader, useFrame, Canvas, useThree, extend, ReactThreeFiber, useUpdate } from "react-three-fiber"
import usePromise from "react-promise-suspense";

import {SERVICE_URL} from "../../../constants"

// Import from jsm for smaller bundles and faster apps
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Asset } from 'expo-asset';

export default function Model({ ...props}) {
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
        props.setStatus("ready")
        return [(loaded as any).object, (loaded as any).bones, (loaded as any).skeleton];
    }, [loaded]);

    const nodes = (loaded as any).nodes

    useFrame((state, delta) => {

        moveJoint([props.arm[0].current, 0,0],nodes.Arm0, 360)
        // nodes.Arm0.rotation.xD = props.arm[0].current
        // nodes.Arm0.rotation.yD = props.arm[1]
        // nodes.Arm0.rotation.zD = props.arm[2]
        //moveJoint(props.arm, nodes.Arm0)
        //moveJoint(props.forearm, nodes.Arm1)
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

function moveJoint(amount: number[], joint: any, degreeLimit = 40) {
    let degrees = { x: amount[0], y: amount[1], z: amount[2] }
    joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.y, 1)
    joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.x, 1)
    joint.rotation.zD = lerp(joint.rotation.zD || 0, degrees.z, 1)
    joint.rotation.x = THREE.MathUtils.degToRad(joint.rotation.xD)
    joint.rotation.y = THREE.MathUtils.degToRad(joint.rotation.yD)
    joint.rotation.z = THREE.MathUtils.degToRad(joint.rotation.zD)
}

function lerp(v0: any, v1: any, t: any) {
    return v0 * (1 - t) + v1 * t
}
