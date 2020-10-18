import * as THREE from "three"
import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { useLoader, useFrame, Canvas, useThree, extend, ReactThreeFiber, useUpdate } from "react-three-fiber"


//This methods provides the orbitControls, this object overrides several camera settings, 
//  therefore focus, position, rotation etc. of the camera has to be defined here
export const CameraControls = (props: any) => {

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
            //side
            camera.position.set(-130, -15, 5);
            //back
            //camera.position.set(-40, 0, -140);
            (controls.current as any).target.set(0, 0, 0);
        }
        else {
            //camera.position.set(object?.position.x, object?.position.y, 100);
            if (prevFocus.current !== props.focus) {
                //side
                camera.position.set(-130, -15, 5);
                //back
                //camera.position.set(-40, 0, -140);
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

export function Camera(props: any) {
    const ref = useRef()
    const { setDefaultCamera } = useThree()
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera((ref as any).current), [])
    // Update it every frame
    useFrame(() => (ref as any).current.updateMatrixWorld())
    return <perspectiveCamera ref={ref} {...props} position={[-130, -15, 5]} />
}

export function DebugAngleGenerator(time: number) {

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

