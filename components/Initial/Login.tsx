import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { AttemptLogin } from '../User/UserActions';

//import SensorDataView from './components/SensorDataView';

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


const Login = ({ navigation }: Props) => {

    const [status, setStatus] = useState()
    const dispatch = useDispatch();

    const [email, setEmail] = useState('joana.s@mail.com');
    const [password, setPassword] = useState('qwe123');

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
                    width: "100%"
                }}>
                    <View style={{
                        aspectRatio: 1,
                        width: 50,
                        padding: 10,
                        borderRadius: 25,
                        backgroundColor: "#F2F2FC"
                    }}>
                        <Text onPress={() => { navigation.navigate("Welcome") }} >
                            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#5954DB" }} size={30} />
                        </Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    height: "25%",
                    width: "100%",
                    padding: 25
                }}>
                    <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 35 }}> Olá! </Text>

                </View>
                <View style={{
                    flexDirection: "column",
                    padding: 15,
                    alignContent: "center",
                    alignItems: "center",
                    height: "35%",
                    width: "100%"
                }}>

                    <TextInput
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0 }}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        autoCompleteType={"email"}
                    />


                    <TextInput
                        style={{ fontFamily: "Rawline", marginTop: 30, height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0 }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        autoCompleteType={"password"}
                        secureTextEntry
                    />

                    <LinearGradient
                        // Button Linear Gradient
                        colors={['rgba(87,81,219,1.0)', 'rgba(155,152,233,1.0)']}
                        start={[0, 1]}
                        end={[1.5, 0]}
                        style={{
                            flexDirection:"column",
                            padding: 15,
                            height: 60,
                            alignContent: "center",
                            alignItems: 'center',
                            borderRadius: 5,
                            alignSelf: "stretch",
                            marginTop: 30
                        }}
                    >
                        <Text
                            style={{ fontFamily: "Rawline", color: "#FFF", fontSize: 17, width: "90%", height: "100%", textAlign: "center", textAlignVertical: "center" }}
                            onPress={() => { dispatch(AttemptLogin(email, password, setStatus)) }}
                        >
                            Entrar
          </Text>
                    </LinearGradient>

                    {
                        status && status !== "success" ?
                            <Text style={{ fontFamily: "Rawline-Bold", marginTop: 5, color: "#FA3333", fontSize: 12, alignSelf: "center" }}> Email ou password errados! </Text>
                            :
                            <></>
                    }

                    <Text style={{ fontFamily: "Rawline", marginTop: 20, color: "#000", fontSize: 12, alignSelf: "flex-start" }}> Esqueci-me da password! </Text>

                    <Text style={{ fontFamily: "Rawline", marginTop: 70, color: "#000", fontSize: 12, alignSelf: "center" }}> Não tem conta? <Text style={{ color: "#5954DB" }}>Inscrever</Text></Text>


                </View>
            </View>
        </>
    );
}

export default Login;