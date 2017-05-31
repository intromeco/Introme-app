import React, { Component } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase'

import images from '../../config/images.js';
import styles from './styles.js';

const firebaseConfig = {
  apiKey: "AIzaSyAEJXRqfrDkOpMFSjtsCwoDqRc8EZnJybI",
  authDomain: "intro-77177.firebaseapp.com",
  databaseURL: "https://intro-77177.firebaseio.com",
  storageBucket: "intro-77177.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class LoginScreen extends Component {

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['email', 'user_friends', 'public_profile', 'user_photos']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
            firebase.auth().signInWithCredential(credential).then((result) => {

            }, (error) => {
              console.log(error)
            })
          }, (error => {
            console.log('Something went wrong ' + error)
          }))
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={images.login.splashLogin}>
          <View style={styles.loginSection}>
            <Image
              style={styles.splashLogo}
              source={images.login.logo}
            />
            <TouchableHighlight onPress={this._fbAuth}>
              <Image
                style={styles.signinButton}
                source={images.login.facebookSignIn}
              />
            </TouchableHighlight>
            <Text style={styles.text}>Don't worry we will never post to Facebook</Text>
          </View>
        </Image>
      </View>
    )
  }
};
