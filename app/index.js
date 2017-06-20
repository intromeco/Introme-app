import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FBSDK, { 
  LoginManager, 
  AccessToken, 
  GraphRequest, 
  GraphRequestManager 
} from 'react-native-fbsdk';
import { Tabs, Stack, ExistingUser } from './config/routes.js';
import './config/settings.js';
import firebase from 'firebase'

export default class intromeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:false
    };
  }

  componentWillMount() {
    let user = AccessToken.getCurrentAccessToken().toString()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: true })
        console.log("authenticated", user);
      } else {
        console.log("authenticated", false);
      }
    });
  }

  render() {
    return (
      <Stack />
    )
  }
}

AppRegistry.registerComponent('intromeApp', () => intromeApp);
