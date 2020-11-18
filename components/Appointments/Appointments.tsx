import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import MyAgenda from './Agenda';
import LineButton from '../Global/LineButton';

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

const Appointments = ({ navigation }: Props) => {

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
                    height: "10%",
                    width: "100%",
                }}>
                    <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 22 }}>Consultas</Text>
                </View>

                <View style={{
                    height: "75%",
                    width: "100%",
                }}>
                    <MyAgenda />
                </View>

                <View style={{
                    flexDirection: "column",
                    padding: 15,
                    height: "15%",
                    width: "100%",
                }}>
                    <LineButton
                        title={"Nova Consulta"}
                        onPress={() => { }}
                        textStyle={{ fontSize: 12 }}
                        buttonStyle={{ width: "80%", height: "80%", marginLeft: "10%" }}
                    />

                </View>

            </View>
        </>
    );
}


export default Appointments;