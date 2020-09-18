import React from 'react';
import { Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    title: string,
    onPress: Function,
    buttonStyle?: Object,
    textStyle?: Object,
    disabled?: boolean
}


const GradientButton = (props: Props) => {
    return (
            <LinearGradient
                // Button Linear Gradient
                colors={props.disabled ? ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.4)'] : ['rgba(87,81,219,1.0)', 'rgba(155,152,233,1.0)']}
                start={[0, 1]}
                end={[1.5, 0]}
                style={
                    {
                        ...props.buttonStyle,
                        flexDirection: "column",
                        padding: 10,
                        height: 50,
                        alignContent: "center",
                        alignItems: 'center',
                        borderRadius: 5,
                    }}
            >
                <Text
                    style={{ fontFamily: "Rawline", color: "#FFF", fontSize: 17, width: "90%", height: "100%", textAlign: "center", textAlignVertical: "center", ...props.textStyle }}
                    onPress={props.onPress}
                >
                    {props.title}
                </Text>
            </LinearGradient>
    )

}

export default GradientButton;