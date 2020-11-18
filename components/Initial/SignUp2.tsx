import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { AttemptLogin, CreateNewPatient } from '../User/UserActions';
import GradientButton from '../Global/GradientButton';
import { ScrollView } from 'react-native-gesture-handler';
import LineButton from '../Global/LineButton';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker'
import UserReducer, { SignUpUser, SIGN_UP_PART2, SIGN_UP_SUBMIT } from '../User/UserReducer';
import Spinner from 'react-native-spinkit';
import FlashMessage, { showMessage } from "react-native-flash-message";

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


const SignUp2 = ({ navigation }: Props) => {

    const [status, setStatus] = useState("")
    const dispatch = useDispatch();

    const [number, setNumber] = useState(0);
    const [address, setAddress] = useState('');
    const [idNum, setIdNum] = useState(0);
    const [fiscalNum, setFiscalNum] = useState(0);
    const [photo, setPhoto] = useState<ImagePickerResponse | null>(null)
    const signupPatient = useSelector((state: UserReducer) => state.UserReducer.signup) as SignUpUser
    const submiting = useSelector((state: UserReducer) => state.UserReducer.isUpdating) as boolean
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string


    const handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setPhoto(response)
            }
        })
    }

    useEffect(() => {
        if (token) {
            showMessage({
                message: "Conta Criada!",
                description: "Bem-vindo",
                type: "success",
                icon: "success",
                duration: 2000,
                backgroundColor: "#5954DB"
            });
            
        }
    }, [status])

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
                        <Text onPress={() => { navigation.navigate("SignUp1") }} >
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
                        <Text style={{ fontFamily: "Rawline-Bold", color: "#5954DB", fontSize: 30, textAlignVertical: "center", height: "100%", alignSelf: "center" }}> Estamos quase ...</Text>
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
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: 0 }}
                        onChangeText={text => setNumber(Number(text.replace(/[^0-9.]/g, "")))}
                        placeholder={"Número de Telemóvel"}
                        value={number === 0 ? "" : number.toString()}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: 20 }}
                        onChangeText={text => setAddress(text)}
                        placeholder={"Morada"}
                        value={address}
                        autoCompleteType={"street-address"}
                    />

                    <TextInput
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: 40 }}
                        onChangeText={text => setIdNum(Number(text.replace(/[^0-9.]/g, "")))}
                        placeholder={"Cartão do Cidadão"}
                        value={idNum === 0 ? "" : idNum.toString()}
                        keyboardType={"numeric"}
                    />

                    <TextInput
                        style={{ fontFamily: "Rawline", height: 40, width: "95%", borderColor: "#5954DB", borderStyle: "solid", borderWidth: 1, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, marginTop: 20 }}
                        onChangeText={text =>
                            setFiscalNum(Number(text.replace(/[^0-9.]/g, "")))
                        }
                        placeholder={"NIF"}
                        value={fiscalNum === 0 ? "" : fiscalNum.toString()}
                        keyboardType={"numeric"}
                    />

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {photo && (
                            <React.Fragment>
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{ width: 100, height: 100, borderRadius: 100 / 2, marginTop: 20 }}
                                />
                            </React.Fragment>
                        )}
                        {!photo && (
                            <View style={{ height: 100, width: 100 }} />
                        )}
                        <LineButton
                            title={"Carregar Imagem"}
                            onPress={handleChoosePhoto}
                            buttonStyle={{
                                width: "100%",
                                marginTop: 20
                            }}
                            textStyle={{
                                fontSize: 15
                            }}
                        />
                    </View>


                    {
                        !submiting ?
                            <GradientButton
                                title={"Registar"}
                                onPress={() => {
                                    dispatch(() => (dispatch({
                                        type: SIGN_UP_PART2,
                                        payload: {
                                            phoneNumber: number,
                                            address: address,
                                            identificationNum: idNum,
                                            fiscalNumber: fiscalNum
                                        }
                                    })))
                                    setTimeout(() => {
                                        dispatch(CreateNewPatient(signupPatient, photo ))
                                    }, 500)
                                }}
                                buttonStyle={{
                                    width: "100%",
                                    marginTop: 20
                                }}
                                textStyle={{
                                    fontSize: 15
                                }}
                            /> :
                            <GradientButton
                                title={""}
                                onPress={() => { }}
                                buttonStyle={{
                                    width: "100%",
                                    marginTop: 20
                                }}
                                textStyle={{
                                    fontSize: 15
                                }}
                            >
                                <Spinner isVisible={true} size={35} type={"ThreeBounce"} color={"#FFF"} />
                            </GradientButton>
                    }



                </ScrollView>
            </View>
        </>
    );
}

export default SignUp2;