import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'

import { SERVICE_API } from "../../constants"

import {
    SIGN_UP_COMPLETE,
    SIGN_UP_FAIL,
    SIGN_UP_SUBMIT,
    USER_LOGIN,
    USER_LOGIN_COMPLETE,
    USER_LOGIN_FAILED
} from './UserReducer'

import Store from '../Redux/Store';
import { Platform } from 'react-native'
import { showMessage } from 'react-native-flash-message'

export const AttemptLogin = (email: string, password: string, setStatus: Function) => {

    return (dispatch: Function) => {

        dispatch({
            type: USER_LOGIN
        });

        axios.post(SERVICE_API + 'login', null, {
            params: {
                "email": email,
                "password": password,
                "role": "PATIENT"
            }
        })
            .then(function (response) {

                let token = response.data.token;
                let decoded: any = jwt(token);
                setStatus("success")

                const options = {
                    headers: { "Authorization": "Bearer " + token }
                }

                axios.get(SERVICE_API + 'patient/profile', options)
                    .then(function (response) {

                        dispatch({
                            type: USER_LOGIN_COMPLETE,
                            payload: { ...decoded.user, token, password, ...response.data }
                        });

                    })
                    .catch(function (error) {
                        console.log("user info fetch failed")
                        if ((error.message as string).indexOf("500") > 0)
                            setStatus("systemFail")
                        else
                            setStatus("failed")

                        dispatch({
                            type: USER_LOGIN_FAILED
                        });
                    })


            })
            .catch(function (error) {
                console.log("login failed")
                if ((error.message as string).indexOf("500") > 0)
                    setStatus("systemFail")
                else
                    setStatus("failed")

                dispatch({
                    type: USER_LOGIN_FAILED
                });

            })
    }
}

export const AttemptLogout = () => {

    Store.persistor.purge()
        .then(() => {
            console.log("LOGOUT")
        })
        .catch(() => {
            console.error("Redux state persistor purge failed")
        });

}


export const CreateNewPatient = (patient: any, patientImage: object | undefined | null) => {


    return (dispatch: Function) => {


        dispatch({
            type: SIGN_UP_SUBMIT,
        });

        console.log(patient)

        axios.post(SERVICE_API + 'patient', patient, {})
            .then(function (response) {


                axios.post(SERVICE_API + 'login', null, {
                    params: {
                        "email": patient.email,
                        "password": patient.password,
                        "role": "PATIENT"
                    }
                })
                    .then(function (response) {

                        let token = response.data.token;
                        let decoded: any = jwt(token);

                        if (patientImage !== undefined && patientImage !== null)
                            uploadImage(token, patientImage, decoded.user._id)

                        dispatch({
                            type: SIGN_UP_COMPLETE,
                        });

                        const options = {
                            headers: { "Authorization": "Bearer " + token }
                        }

                        setTimeout(() => {
                            axios.get(SERVICE_API + 'patient/profile', options)
                                .then(function (response) {

                                    dispatch({
                                        type: USER_LOGIN_COMPLETE,
                                        payload: { ...decoded.user, token, ...patient.password, ...response.data }
                                    });

                                    showMessage({
                                        message: "Conta Criada!",
                                        description: "Bem-vindo",
                                        type: "success",
                                        icon: "success",
                                        duration: 2000,
                                        backgroundColor: "#5954DB"
                                    });

                                })
                                .catch(function (error) {
                                    console.log("user info fetch failed")

                                    dispatch({
                                        type: USER_LOGIN_FAILED
                                    });
                                })
                        }, 1000)


                    })
                    .catch(function (error) {
                        dispatch({
                            type: SIGN_UP_FAIL,
                        });
                    })
            })
            .catch(function (error) {

                showMessage({
                    message: "Erro na criação!",
                    description: error.message,
                    type: "danger",
                    icon: "danger",
                    duration: 2000,
                    backgroundColor: "#DD0055"
                });

                console.log(error)

                dispatch({
                    type: SIGN_UP_FAIL,
                });
            })

    }
}

const uploadImage = (token: string, selectedFile: any, userID: string) => {
    const formData = new FormData();
    formData.append('file', {
        uri: Platform.OS === 'android' ? selectedFile.uri : 'file://' + selectedFile.uri,
        name: 'test',
        type: 'image/jpeg' // or your mime type what you want
    });
    formData.append('patientID', userID)
    console.log(formData)
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        }
    }

    axios.post(SERVICE_API + "patient/profileImage", formData, config)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })


}
