import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import LineButton from '../Global/LineButton';
import UserReducer, { ADD_PROGRESS } from '../User/UserReducer';
import { ScrollView } from 'react-native-gesture-handler';
import { SERVICE_API } from '../../constants';
import { GetHistory } from './HistoryActions';
import HistoryCard from './HistoryCard';

type Props = {
    navigation: NavigationStackProp<{ userId: string }>;
};

const History = ({ navigation }: Props) => {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const patientID = useSelector((state: UserReducer) => state.UserReducer.user?._id) as string
    const [refreshing, setRefreshing] = useState(false);
    const [status, setStatus] = useState();
    const [history, setHistory] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        GetHistory(patientID, token, setHistory, setRefreshing);
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        GetHistory(patientID, token, setHistory, setRefreshing);

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

                    }}>Meu Histórico</Text>


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
                        history.length === 0 ?
                            <Text style={{
                                fontFamily: "Rawline",
                                color: "#5954DB",
                                fontSize: 15,
                                height: "100%",
                                width: "100%",
                                textAlign: "center",
                                textAlignVertical: "center"
                            }}>Não tem nenhuma actividade registada </Text>
                            :
                            <>
                                {history.map((value, index) => (
                                    <HistoryCard values={value} key={index} />
                                ))}

                            </>
                    }

                </ScrollView>

                <View style={{
                    flexDirection: "column",
                    padding: 15,
                    height: "15%",
                    width: "100%",
                }}>
                    <LineButton
                        title={"Adicionar Actividade Manual"}
                        onPress={() => { dispatch(() => (dispatch({ type: ADD_PROGRESS }))) }}
                        textStyle={{ fontSize: 12 }}
                        buttonStyle={{ width: "80%", height: "80%", marginLeft: "10%" }}
                    />

                </View>

            </View>
        </>
    );
}


export default History;