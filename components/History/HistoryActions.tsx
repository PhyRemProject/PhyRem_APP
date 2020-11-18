import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import * as THREE from "three"

import { SERVICE_API } from "../../constants"

import Store from '../Redux/Store';
import { ToastAndroid } from 'react-native'

export const GetHistory = (patientID: string, token: string, setHistory: Function, setRefreshing: Function) => {


    const options = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    let compareHistory = (a: any, b: any) => {
        if (a.creationDate < b.creationDate)
            return 1
        if (a.creationDate > b.creationDate)
            return -1
        return 0
    }

    axios.get(SERVICE_API + 'patient/history/' + patientID, options)
        .then(function (response) {
            console.log(response.data);

            response.data.patientevals.forEach((element : any) => {
                element.type = "patEval"
            });
            response.data.physioevals.forEach((element : any) => {
                element.type = "physioEval"
            });
            response.data.exercises.forEach((element : any) => {
                element.type = "exercise"
            });


            let sortedHistory = [
                ...response.data.patientevals,
                ...response.data.physioevals,
                ...response.data.exercises
            ].sort(compareHistory)

            setHistory(sortedHistory)
            console.log("history loaded");
            setRefreshing(false)
        })
        .catch(function (error) {
            console.log("history load error");
            ToastAndroid.showWithGravity(
                "Falha a carregar o Histórico",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            setRefreshing(false);
        })
}

