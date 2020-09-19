import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Rawline'
    },
});

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

const History = ({ navigation }: Props) => {

    const [status, setStatus] = useState()
    const dispatch = useDispatch();

    return (
        <>
            <View style={{
                flex: 1,
                flexWrap: 'wrap',
                flexDirection: "column",
                backgroundColor: "#FFF"
            }}>
                <View style={{
                    flexDirection: "row",
                    padding: 15,
                    alignContent: "center",
                    height: "20%",
                    width: "100%",
                }}>
                    <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 22 }}>Histórico</Text>
                </View>

            </View>
        </>
    );
}


export default History;