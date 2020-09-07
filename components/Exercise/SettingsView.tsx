import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  PermissionsAndroid
} from 'react-native';

import {
  Button,
  Icon
} from 'react-native-elements';

import WifiManager from "react-native-wifi-reborn";
import {styles} from "../Dashboard/Dashboard"

export default function SettingsView(props, {navigation}) {

  let goBack = props.goBack;

  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [permissionStatus, setPermissionStatus] = useState("notAsked");
  const [availConnections, setAvailConnections] = useState(["test"]);

  const searchSensor = () => {
    setConnectionStatus("searching")

    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        setAvailConnections([...availConnections, ssid]);
        console.log(availConnections)
        console.log("Your current connected wifi SSID is " + ssid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );

    setConnectionStatus("attempting to connect")
    WifiManager.connectToProtectedSSID("PhySensors", "classic123", false).then(
      () => { setConnectionStatus("connected") }
    ).catch((err) => { setConnectionStatus("error occured"); console.log(err) })


  }

  const askForUserPermissions = async (setPermissionStatus) => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Wifi networks',
          'message': 'We need your permission in order to find wifi networks'
        } as any
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }


    // const { status } = await Permissions.askAsync(Permissions.LOCATION);

    // setPermissionStatus(status);

    // if (status === 'granted')
    //   console.log("granted");


    // if (status === 'undetermined')
    //   console.log("undetermined");


    // if (status === 'denied')
    //   console.log("denied");

  }

  const handleWifiSwitching = () => {

    //THERE MIGHT BE ISSUES HERE!!!!!!!

    // console.log(wifi as any);

    // wifi.isEnabled((isEnabled) => {
    //   if (isEnabled) {
    //     console.log("wifi service enabled");
    //   } else {
    //     console.log("wifi service is disabled");
    //   }
    // });

  }

  if (permissionStatus === "notAsked")
    askForUserPermissions(setPermissionStatus)

  if (permissionStatus === "granted")
    handleWifiSwitching()

  return (
    <View style={styles.container}>
      <Icon
        raised
        name="arrow-left"
        type="font-awesome"
        size={15}
        color="black"
        onPress={goBack} />

      <Text>Permission: {permissionStatus}</Text>
      <Text>All Settings</Text>
      <Text>{connectionStatus}</Text>

      {connectionStatus === "disconnected" ? (
        <Button
          title="Connect to Sensor"
          onPress={searchSensor}
        />
      ) : connectionStatus === "searching" ? (
        <Button
          title="Searching..."
          loading
        />
      ) : (
            <Button
              title="Error"
              disabled
            />
          )}

      {availConnections.map((t) => {
        <Text>{t}</Text>
      })}

      <Text>cenas</Text>



    </View>
  );
}