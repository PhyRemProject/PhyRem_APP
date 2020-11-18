import React, { Component, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';


const MyAgenda = () => {

    const [items, setItems] = useState({})

    return (

        <Agenda
            // The list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key has to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            items={{
                '2020-11-10': [{ physician: 'Dr. Joao Sousa', hour: "12h00" }],
                '2020-11-11': [{ physician: 'Dr. Raquel Tavares', hour: "13h00" }],
                '2020-11-14': [{ physician: 'Dr. Raquel Tavares', hour: "14h00" }, { physician: 'Dr. Joao Sousa', hour: "16h00" }]
            }}

            // Initially selected day
            selected={'2020-11-10'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2020-01-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2021-12-30'}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={20}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={20}
            // Specify how each item should be rendered in agenda
            renderItem={(item, firstItemInDay) => {

                console.log(item)
                //console.log(firstItemInDay)

                return (<View style={{
                    padding: 15,
                    alignContent: "center",
                    height: 80,
                    width: "96%",
                    backgroundColor: "#8582E4",
                    borderRadius: 10,
                    margin: 5
                }} >
                    <Text style={{
                        fontFamily: "Rawline",
                        color: "#FFF",
                        fontSize: 13,
                        paddingTop: 0

                    }}>Hora: {item.hour}</Text>
                    <Text style={{
                        fontFamily: "Rawline",
                        color: "#FFF",
                        fontSize: 13,
                        paddingTop: 0

                    }}>Médico: {item.physician}</Text>
                </View>);
            }}

            // Specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={{
                '2020-11-10': { marked: true },
                '2020-11-11': { marked: true },
                '2020-11-14': { marked: true }
            }}
            // Agenda theme
            theme={{
                calendarBackground: '#FFF',
                agendaKnobColor: '#5954DB',
                markedDates: "#5954DB"
            }}
        // Agenda container style
        />
    );

}

export default MyAgenda;