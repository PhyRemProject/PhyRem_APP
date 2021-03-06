# **PhyRem Mobile App** - Patient client

This is the PhyRem Patient client, a ReactNative web application written in Typescript for type checking, and uses Redux to maintain an app state.
The goal of this application is to be available for both Android and iOS OSs. 
It provides an interface to interact with the system as a patient, and also has the capability to connect to a custom motion capture system and display/record its data to send to the service.

App components are split between their own directories with their appropriate reducers and actions.

Note: Eventhough this app was built to support both iOS and Android, unfortunately, builds and testing were only available for Android. If you want to built it to iOS major modifications might be required.

#

## **Before Start**
ReactNative requires setup, you need to install Android Studio or XCode and other tools, please search and do those steps first.
`react-native-cli` should be installed globally for the next steps, run `npm i -g react-native-cli`

Before doing anything, read the next section to set the environment variables correctly and come back here.

What are you trying to do?

**Build the application:** To build the Android APK you should follow ReactNative's instructions, as these were the one's followed. 
[ReactNative - Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android)

Again, iOS was not tested, however, here's the documentation to publish the app [ReactNative - Publishing to Google Play Store](https://reactnative.dev/docs/next/publishing-to-app-store)

**Develop/Debug the application:** As with any React application execute the following commands:
`npm install`, depending on your OS you might need to run the react native server separately, run `react-native start` and on another console `npm run android` or `npm run ios`.
An app should spawn on the emulator or device with the debug app.

#

## **Environment Variables**
The application requires a few variables to be set, **by default the app is set for development/debug and it should not work with your configuration**.

To change these values, edit file `constants.tsx`. Here you can set the IP address or path to the backend you deployed. Don't now what backend I'm refering to? Read this repository [PhyRem - Backend](https://github.com/PhyRemProject/PhyRem_BE)

