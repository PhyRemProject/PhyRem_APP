import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'


import {
    USER_LOGIN,
    USER_LOGIN_COMPLETE,
    USER_LOGIN_FAILED
} from './UserReducer'

import Store from '../Redux/Store';

const BE_URL = "http://192.168.2.100:5000/api/"

export const AttemptLogin = (email: string, password: string, setStatus: Function) => {

    return (dispatch: Function) => {

        dispatch({
            type: USER_LOGIN
        });

        axios.post(BE_URL + 'login', null, {
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
                console.log("login successful")

                const options = {
                    headers: { "Authorization": "Bearer " + token }
                }

                axios.get(BE_URL + 'patient/profile', options)
                    .then(function (response) {


                        console.log(response.data)

                        dispatch({
                            type: USER_LOGIN_COMPLETE,
                            payload: { ...decoded.user, token, ...response.data }
                        });

                        console.log("LOGIN SUCCESSFUL")

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
