import React from "react"
import { AppRegistry } from 'react-native';
import { Provider } from "react-redux"

import { name as appName } from './app.json';
import App from './App';
import Store from './components/Redux/Store'


const Root = () => (
    <Provider store={Store.store}>
      <App />
    </Provider>
  )
  
  AppRegistry.registerComponent(appName, () => Root);