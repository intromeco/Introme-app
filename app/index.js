import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LoginScreen from './routes/loginScreen/login.js';

export default class intromeApp extends Component {
  render() {
    return (
      <LoginScreen />
    )
  }
}

AppRegistry.registerComponent('intromeApp', () => intromeApp);