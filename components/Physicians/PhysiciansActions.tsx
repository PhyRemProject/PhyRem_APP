import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import * as THREE from "three"

import { SERVICE_API } from "../../constants"

import Store from '../Redux/Store';
import { ToastAndroid } from 'react-native'

export const GetPhysicians = (token: string, setPhysicians: Function, setRefreshing: Function) => {


    const options = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(SERVICE_API + 'patient/physicians', options)
        .then(function (response) {
            console.log(response.data);
            setPhysicians(response.data.physicians)
            console.log("physicians loaded");
            setRefreshing(false)
        })
        .catch(function (error) {
            console.log("physicians load error");
            ToastAndroid.showWithGravity(
                "Falha a carregar Médicos",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            setRefreshing(false);
        })
}

