import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import LineButton from '../Global/LineButton';
import { GetPhysicians } from './PhysiciansActions';
import UserReducer from '../User/UserReducer';
import { ScrollView } from 'react-native-gesture-handler';
import { SERVICE_API } from '../../constants';
import { RGBA_ASTC_10x10_Format } from 'three';
import PhysicianCard from './PhysicianCard';

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

const Physicians = ({ navigation }: Props) => {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const [refreshing, setRefreshing] = useState(false);
    const [status, setStatus] = useState();
    const [physicians, setPhysicians] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        GetPhysicians(token, setPhysicians, setRefreshing);
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        GetPhysicians(token, setPhysicians, setRefreshing);

    }, []);

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
                    <Text style={{
                        fontFamily: "Rawline-Bold",
                        color: "#5954DB",
                        fontSize: 22,
                        width: "50%",

                    }}>Meus Médicos</Text>


                </View>

                <ScrollView
                    style={{
                        flexDirection: "column",
                        padding: 15,
                        minHeight: "70%",
                        width: "100%",
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {
                        physicians.length > 0 ?
                            physicians.map((value, index) => (
                                <PhysicianCard physician={value} key={index} />
                            )) :
                            <Text style={{
                                fontFamily: "Rawline",
                                color: "#5954DB",
                                fontSize: 15,
                                height: "100%",
                                width: "100%",
                                textAlign: "center",
                                textAlignVertical: "center"
                            }}>Não tem nenhum médico associado </Text>
                    }


                </ScrollView>

                <View style={{
                    flexDirection: "column",
                    padding: 15,
                    height: "15%",
                    width: "100%",
                }}>
                    <LineButton
                        title={"Procurar Novo"}
                        onPress={() => { }}
                        textStyle={{ fontSize: 12 }}
                        buttonStyle={{ width: "80%", height: "80%", marginLeft: "10%" }}
                    />

                </View>

            </View>
        </>
    );
}


export default Physicians;