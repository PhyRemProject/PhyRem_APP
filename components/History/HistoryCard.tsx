
import { faChild, faEnvelopeOpenText, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, RefreshControl } from 'react-native';
import { SERVICE_API, SERVICE_URL } from '../../constants';


const HistoryCard = (props: any) => {

    console.log(props)

    return (
        <View style={{
            flexDirection: "row",
            height: 140,
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
                {
                    props.values.type === "exercise" ?
                        < FontAwesomeIcon
                            icon={faChild}
                            style={{
                                color: "#FFF",
                                width: "100%",
                                alignContent: "center",
                                alignSelf: "center",
                                marginTop: "20%"
                            }} size={40} /> :
                        props.values.type === "patEval" ?
                            < FontAwesomeIcon
                                icon={faEnvelopeOpenText}
                                style={{
                                    color: "#FFF",
                                    width: "100%",
                                    alignContent: "center",
                                    alignSelf: "center",
                                    marginTop: "20%"
                                }} size={40} /> :
                            < FontAwesomeIcon
                                icon={faTimes}
                                style={{
                                    color: "#FFF",
                                    width: "100%",
                                    alignContent: "center",
                                    alignSelf: "center",
                                    marginTop: "20%"
                                }} size={40} />
                }
            </View>

            <View style={{
                maxHeight: "100%",
                width: "70%",
                paddingVertical: 7,
                alignContent: "center"
            }}>
                {
                    props.values.type === "exercise" ?
                        <>
                            <Text style={{
                                fontFamily: "Rawline-Bold",
                                color: "#FFF",
                                fontSize: 19,
                            }}>Exercício</Text>

                            <Text style={{
                                fontFamily: "Rawline-Bold",
                                color: "#FFF",
                                fontSize: 13,
                                paddingTop: 15
                            }}>Membro</Text>
                            <Text style={{
                                fontFamily: "Rawline",
                                color: "#FFF",
                                fontSize: 13,
                                paddingTop: 0
                            }}>Cotovelo Direito</Text>

                            <Text style={{
                                fontFamily: "Rawline-Bold",
                                color: "#FFF",
                                fontSize: 13,
                                paddingTop: 5
                            }}>Data</Text>
                            <Text style={{
                                fontFamily: "Rawline",
                                color: "#FFF",
                                fontSize: 13,
                                paddingTop: 0
                            }}>{props.values.creationDate}</Text>
                        </> :
                        props.values.type === "patEval" ?
                            <>
                                <Text style={{
                                    fontFamily: "Rawline-Bold",
                                    color: "#FFF",
                                    fontSize: 19,
                                }}>Avaliação de Paciente</Text>

                                <Text style={{
                                    fontFamily: "Rawline-Bold",
                                    color: "#FFF",
                                    fontSize: 13,
                                    paddingTop: 15
                                }}>Diagnóstico</Text>
                                <Text style={{
                                    fontFamily: "Rawline",
                                    color: "#FFF",
                                    fontSize: 13,
                                    paddingTop: 0
                                }}>{props.values.clinicDiagnosis}</Text>

                                <Text style={{
                                    fontFamily: "Rawline-Bold",
                                    color: "#FFF",
                                    fontSize: 13,
                                    paddingTop: 5
                                }}>Data</Text>
                                <Text style={{
                                    fontFamily: "Rawline",
                                    color: "#FFF",
                                    fontSize: 13,
                                    paddingTop: 0
                                }}>{props.values.creationDate}</Text>
                            </> : <></>

                }

            </View>
        </View>
    );
}


export default HistoryCard;


