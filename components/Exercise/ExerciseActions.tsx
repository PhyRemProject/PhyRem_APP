import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import * as THREE from "three"

import { SERVICE_API } from "../../constants"

import Store from '../Redux/Store';

export const SendExercise = (token: string, savedQuaterns: Object[], setStatus: Function) => {


    const options = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(SERVICE_API + 'exercises', {data: savedQuaterns}, options)
        .then(function (response) {
            setStatus("success")
            console.log("exercise submit success")
        })
        .catch(function (error) {
            console.log("exercise submit failed")
            if ((error.message as string).indexOf("500") > 0)
                setStatus("systemFail")
            else
                setStatus("failed")

        })
}

