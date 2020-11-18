import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { NavigationStackProp } from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {
    navigation: any,
    style?: Object,
}


const BackButton = (props: Props) => {
    return (

        <View style={props.style}>

            <View style={{
                aspectRatio: 1,
                width: 50,
                padding: 10,
                borderRadius: 25,
                backgroundColor: "#F2F2FC",
                alignSelf:"center",
                alignContent:"center"
            }}>
                <Text onPress={() => { props.navigation.goBack(null) }} >
                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#5954DB" }} size={30} />
                </Text>
            </View>

        </View>
    )

}

export default BackButton;