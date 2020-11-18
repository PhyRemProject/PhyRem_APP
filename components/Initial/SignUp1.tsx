import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { AttemptLogin } from '../User/UserActions';
import GradientButton from '../Global/GradientButton';
import { ScrollView } from 'react-native-gesture-handler';
import { SIGN_UP_PART1 } from '../User/UserReducer';

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


const SignUp1 = ({ navigation }: Props) => {

    const [status, setStatus] = useState()
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [gender, setGender] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || birthdate;
        setShow(Platform.OS === 'ios');
        setBirthdate(currentDate);
    };

    const showMode = (currentMode: any) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

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
                    alignContent: "center",
                    height: "12%",
                    width: "100%",
                }}>
                    <View style={{
                        aspectRatio: 1,
                        width: 40,
                        padding: 10,
                        marginTop: 15,
                        marginLeft: 15,
                        borderRadius: 25,
                        backgroundColor: "#F2F2FC"
                    }}>
                        <Text onPress={() => { navigation.navigate("Welcome") }} >
                            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#5954DB" }} size={20} />
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: "column",
                        alignSelf: "center",
                        alignContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "70%",
                    }}>
                        <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 35, textAlignVertical: "center", height: "100%" }}> Bem-vindo! </Text>
                    </View>
                </View>



                <View style={{
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                    height: "7%",
                    width: "100%",
                    padding: 10
                }}>
                    <View style={{
                        flexDirection: "row",
                    }}>
                        <Text style={{ fontFamily: "Rawline", color: "#333333", fontSize: 13 }}> Já tem conta? </Text>
                        <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 13 }}
                            onPress={() => { navigation.navigate("Login") }}> Entrar </Text>
                    </View>
                </View>


                <ScrollView style={{
                    flexDirection: "column",
                    padding: 15,
                    alignContent: "center",
                    height: "75%",
                    width: "100%",
                }}>

                    <TextInput
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: -15 }}
                        onChangeText={text => setName(text)}
                        placeholder={"Nome"}
                        value={name}
                        autoCompleteType={"name"}
                    />

                    <TextInput
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: 20 }}
                        onChangeText={text => setEmail(text)}
                        placeholder={"Email"}
                        value={email}
                        autoCompleteType={"email"}
                    />

                    <TextInput
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: 20 }}
                        onChangeText={text => setPassword(text)}
                        placeholder={"Password"}
                        value={password}
                        autoCompleteType={"password"}
                        secureTextEntry
                    />

                    <TextInput
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: 10 }}
                        onChangeText={text => setPasswordConfirm(text)}
                        placeholder={"Confirmação de Password"}
                        value={passwordConfirm}
                        autoCompleteType={"password"}
                        secureTextEntry
                    />

                    <Text
                        style={{ fontFamily: "Rawline", height: 25, width: "95%", marginTop: 25 }}
                    >Data de Nascimento</Text>
                    <Text
                        style={{ fontFamily: "Rawline", height: 25, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0 }}
                        onPress={showDatepicker}

                    >{birthdate.getDate() + "/" + birthdate.getMonth() + 1 + "/" + birthdate.getFullYear()}</Text>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={birthdate}
                            mode={mode}
                            display="calendar"
                            onChange={onChange}
                            style={{ backgroundColor: "#5954DB" }}
                        />
                    )}

                    <Text
                        style={{ fontFamily: "Rawline", height: 25, width: "95%", marginTop: 20 }}
                    >Género</Text>
                    <Picker
                        selectedValue={gender}
                        style={{ height: 30, width: "100%" }}
                        onValueChange={(itemValue, itemIndex) =>
                            setGender(itemValue)
                        }>
                        <Picker.Item label="Masculino" value="male" />
                        <Picker.Item label="Feminino" value="female" />
                        <Picker.Item label="Outro" value="other" />
                        <Picker.Item label="Prefiro não dizer" value="not specified" />
                    </Picker>

                    <GradientButton
                        title={"Seguinte"}
                        onPress={() => {
                            dispatch(() => {
                                dispatch({
                                    type: SIGN_UP_PART1,
                                    payload: {
                                        name: name,
                                        email: email,
                                        password: password,
                                        birthDate: birthdate,
                                        gender: gender
                                    }
                                })
                            })
                            navigation.navigate("SignUp2")
                        }}
                        buttonStyle={{
                            width: "100%",
                            marginTop: 20
                        }}
                        textStyle={{
                            fontSize: 15
                        }}
                    />

                </ScrollView>
            </View>
        </>
    );
}

export default SignUp1;