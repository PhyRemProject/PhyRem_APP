
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import { NavigationStackProp } from 'react-navigation-stack';
import LineButton from '../Global/LineButton';
import { GetPhysicians } from './PhysiciansActions';
import UserReducer from '../User/UserReducer';
import { ScrollView } from 'react-native-gesture-handler';
import { SERVICE_API, SERVICE_URL } from '../../constants';
import { RGBA_ASTC_10x10_Format } from 'three';



const PhysicianCard = (props : any) => {

    const [userpic, setUserpic] = useState(SERVICE_API + "physician/profileImage/" + props.physician._id);

    return (
        <View style={{
            flexDirection: "row",
            height: 190,
            width: "100%",
            backgroundColor: "#8582E4",
            borderRadius: 10, paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 5
            , marginTop: 10
        }}>

            <View style={{
                height: "100%",
                width: "30%",
                alignContent: "center"
            }}>
                <Image
                    source={{ uri: userpic }}
                    style={{ height: 70, width: 70, borderRadius: 70 / 2, alignSelf: "center", marginVertical: "50%" }}
                    onError={(e) => { setUserpic(SERVICE_URL + "/images/default_user_icon.png")}}
                />
            </View>

            <View style={{
                maxHeight: "100%",
                width: "70%",
                paddingVertical: 7,
                alignContent: "center"
            }}>
                <Text style={{
                    fontFamily: "Rawline-Bold",
                    color: "#FFF",
                    fontSize: 19,
                }}>Dr. {props.physician.name}</Text>

                <Text style={{
                    fontFamily: "Rawline-Bold",
                    color: "#FFF",
                    fontSize: 13,
                    paddingTop: 15
                }}>Especialidades</Text>
                <Text style={{
                    fontFamily: "Rawline",
                    color: "#FFF",
                    fontSize: 13,
                    paddingTop: 0
                }}>{props.physician.specialty.map((value:any, index:any) => (value + " "))}</Text>

                <Text style={{
                    fontFamily: "Rawline-Bold",
                    color: "#FFF",
                    fontSize: 13,
                    paddingTop: 5
                }}>Email</Text>
                <Text style={{
                    fontFamily: "Rawline",
                    color: "#FFF",
                    fontSize: 13,
                    paddingTop: 0
                }}>{props.physician.email}</Text>

                <Text style={{
                    fontFamily: "Rawline-Bold",
                    color: "#FFF",
                    fontSize: 13,
                    paddingTop: 5
                }}>Telemóvel</Text>
                <Text style={{
                    fontFamily: "Rawline",
                    color: "#FFF",
                    fontSize: 13,
                    paddingTop: 0
                }}>{props.physician.phoneNumber}</Text>
            </View>
        </View>
    );
}


export default PhysicianCard;


