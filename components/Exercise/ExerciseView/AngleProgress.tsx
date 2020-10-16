import React, { useEffect, useRef, useState, Suspense, useMemo, ErrorInfo } from "react"
import { Text, View } from "react-native";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export interface AngleProgress {
    angleRef : React.MutableRefObject<string>
}

function AngleProgress(props : AngleProgress) {

    const [display, setDisplay] = useState("Angle")

    useEffect(() => {
        const id = setInterval(() => {
            setDisplay(props.angleRef.current)
        }, 77)
    }, [])

    return (

        <View style={{
        }}>

            <Text style={{
            }}>
                {display}
            </Text>

        </View>
    );
}

export default AngleProgress;
