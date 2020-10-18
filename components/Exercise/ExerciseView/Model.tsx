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

const Model = ({ ...props }) => {

    let zeroQ = new THREE.Quaternion(0.0, 0.0, 0.0, 1)
    let zeroArmQ = new THREE.Quaternion(0.0, 0.0, 0.0, 0.1)
    zeroArmQ.setFromEuler(new Euler(THREE.MathUtils.degToRad(-60),THREE.MathUtils.degToRad(25),THREE.MathUtils.degToRad(90)))
    let zeroForearmQ = new THREE.Quaternion(0.0, 0.0, 0.0, 1)

    //start orientation é o zeroQ a referencia de como queres que seja o referencial
    //endOrientation é a leitura actual do gyro que é para ser tornada origem
    //gyroTrackingDelta fica com a diferença entre os dois, permitindo assim fazer a diferença com futuras leituras,
    //  ou seja, futuros endOrientation
    //d: -0.57	x: 0.01	y: -0.01	z: -0.82

    var prevQuaterns: [THREE.Quaternion] = [zeroQ]

    // var gyroDeltaArm = new THREE.Quaternion(props.armOrigin.z.current, props.armOrigin.y.current, props.armOrigin.x.current, -props.armOrigin.w.current)  //startOriuentation
    //     .clone()
    //     .inverse();
    //     gyroDeltaArm.multiply(zeroQ);

    // var gyroDeltaForearm = new THREE.Quaternion(props.forearmOrigin.z.current, props.forearmOrigin.y.current, props.forearmOrigin.x.current, -props.forearmOrigin.w.current)  //startOriuentation
    //     .clone()
    //     .inverse();
    //     gyroDeltaForearm.multiply(zeroQ);


    const rotationSmoothing = (quat: QuaternionCoorRefs) => {
        if (prevQuaterns.length < 10) {
            prevQuaterns.push(new THREE.Quaternion(quat.z.current, quat.y.current, quat.x.current, -quat.w.current))
            return (new THREE.Quaternion(quat.z.current, quat.y.current, quat.x.current, -quat.w.current))
        }
        else {
            prevQuaterns.splice(0, 1)
            prevQuaterns.push(new THREE.Quaternion(quat.z.current, quat.y.current, quat.x.current, -quat.w.current))
            //console.log(prevQuaterns)
            let accx: number = 0, accy: number = 0, accz: number = 0, accw: number = 0;
            for (let i = 0; i < prevQuaterns.length; i++) {
                accx += prevQuaterns[i].x
                accy += prevQuaterns[i].y
                accz += prevQuaterns[i].z
                accw += prevQuaterns[i].w
            }

            return (new THREE.Quaternion((accx / prevQuaterns.length), accy / prevQuaterns.length, accz / prevQuaterns.length, accw / prevQuaterns.length))
        }
    }

    const calculateAngleBetween = (d1: THREE.Vector3, d2: THREE.Vector3) => {

        //Caculate dot product
        let uv = (d1.x * d2.x) + (d1.y * d2.y) + (d1.z * d2.z)

        //Calculate Magnitudes
        let u = Math.sqrt((Math.pow(d1.x, 2) + Math.pow(d1.y, 2) + Math.pow(d1.z, 2)))
        let v = Math.sqrt((Math.pow(d2.x, 2) + Math.pow(d2.y, 2) + Math.pow(d2.z, 2)))

        //arccos the ratio between the two
        let result = Math.acos((uv / (u * v)));
        return THREE.MathUtils.radToDeg(result);
    }

    const rotateBone = (bone: THREE.Bone, quatVals: QuaternionCoorRefs, rotationOrigin: QuaternionCoorRefs) => {
        //let averagedQuatern: THREE.Quaternion = rotationSmoothing(quatVals);
        let averagedQuatern = new THREE.Quaternion(quatVals.z.current, quatVals.y.current, quatVals.x.current, -quatVals.w.current)

        var gyroDelta = new THREE.Quaternion(rotationOrigin.z.current, rotationOrigin.y.current, rotationOrigin.x.current, -rotationOrigin.w.current)  //startOriuentation
            .clone()
            .inverse();
        if (bone.name === "Arm0")
            gyroDelta.multiply(zeroArmQ);
        else if (bone.name === "Arm1")
            gyroDelta.multiply(zeroForearmQ);
        //Quaternion resulting from applying the sensor's readings
        // Since the sensor's default referencial is different from the viewport's, the axis order has to be changed
        // and so, while the order of the viewport is y| x- z. the sensor is z| y- x.
        // This is fairly redundant since after this axis change it is multiplied the gyroTrackingDelta to zero out the
        //  initial position of the sensor, matching the app and the sensor.
        // const tempQuatern = new THREE.Quaternion(y.current, z.current, x.current, -w.current)
        //     .multiply(gyroTrackingDelta);
        const tempQuatern = averagedQuatern
            .multiply(gyroDelta);

        // Following the axis swap, a change of Z's direction of rotation is necessary to match the viewport axis, to do this
        //  all other components are inverted
        const tempQuatern2 = new THREE.Quaternion(-tempQuatern.x, -tempQuatern.y, -tempQuatern.z, -tempQuatern.w);

        //Apply the resulting quaternion to the model
        bone.setRotationFromQuaternion(tempQuatern2);
    }

    const group = useRef()
    const material = useRef()

    const loaded = useLoader(GLTFLoader, SERVICE_URL + "/objects/BodyRigged.glb");

    const [object, bones, skeleton] = useMemo(() => {
        if (!(loaded as any).bones) (loaded as any).bones = loaded.scene.children[0].children[0];
        if (!(loaded as any).skeleton)
            (loaded as any).skeleton = (loaded.scene.children[0].children[1] as any).skeleton;
        if (!(loaded as any).object)
            (loaded as any).object = (loaded.scene.children[0] as any);
        props.setStatus("ready")
        return [(loaded as any).object, (loaded as any).bones, (loaded as any).skeleton];
    }, [loaded]);

    const nodes = (loaded as any).nodes
    let tempArmDir = new THREE.Vector3;
    let tempForearmDir = new THREE.Vector3;
    let angle = "";

    useFrame((state, delta) => {

        rotateBone(nodes.Arm0, props.arm, props.armOrigin);
        rotateBone(nodes.Arm1, props.forearm, props.forearmOrigin);

        (nodes.Arm0 as THREE.Bone).getWorldDirection(tempArmDir);
        (nodes.Arm1 as THREE.Bone).getWorldDirection(tempForearmDir);

        //props.currenAngleRef.current = "x: " + tempQuatArm.x.toPrecision(2) + "\ty: " + tempQuatArm.y.toPrecision(2) + "\tz: " + tempQuatArm.z.toPrecision(2) + "\tw: " + tempQuatArm.w.toPrecision(2);
        //props.currenAngleRef.current = "x: " + tempQuatForearm.x.toPrecision(2) + "\ty: " + tempQuatForearm.y.toPrecision(2) + "\tz: " + tempQuatForearm.z.toPrecision(2) + "\tw: " + tempQuatForearm.w.toPrecision(2);

        angle = calculateAngleBetween(tempArmDir, tempForearmDir).toString()
        //props.currenAngleRef.current = "x: " + tempArmDir.x.toPrecision(2) + "\ty: " + tempArmDir.y.toPrecision(2) + "\tz: " + tempArmDir.z.toPrecision(2);
        props.currenAngleRef.current = "Angle: " + angle;
        //rotateBone(nodes.Arm1, props.arm)
        //(nodes.Arm0 as THREE.Bone).setRotationFromQuaternion(new THREE.Quaternion(0.2,0.0,0.0,1))
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={object} />
            <skinnedMesh geometry={nodes["Body_low"].geometry} skeleton={skeleton}>
                {/* <skeletonHelper args={object} /> */}
                <meshPhongMaterial ref={material} attach="material" color="#b3720a" skinning />
            </skinnedMesh>
        </group>
    )
}


export default Model;