import React, { 
  Component 
} from 'react';

import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import FBSDK, { 
  LoginManager, 
  AccessToken, 
  GraphRequest, 
  GraphRequestManager 
} from 'react-native-fbsdk';

import firebase from 'firebase'
import images from '../../config/images.js';
import styles from './styles.js';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated:false
    };
  }
  _fbAuth() {
    const self = this;
    LoginManager.logInWithReadPermissions(['email', 'user_friends', 'public_profile', 'user_photos']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const token = accessTokenData.accessToken;
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
            firebase.auth().signInWithCredential(credential).then((result) => {
              const responseInfoCallback = (error, result) => {
                if (error) {
                  console.log(error)
                  alert('Error fetching data: ' + error.toString());
                } else {
                  // console.log(result)
                  self.props.navigation.navigate('NewUser', result);
                }
              }
              const infoRequest = new GraphRequest(
                '/me',
                {
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name,picture,albums{name, photos{name, picture}}'
                    },
                    access_token: {
                      string: token.toString()
                    }
                  }
                },
                responseInfoCallback,
              );
              new GraphRequestManager().addRequest(infoRequest).start();
            }, (error) => {
              console.log(error)
            });
          }, (error => {
            console.log('Something went wrong ' + error)
          }));
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
    function loggedIn(result) {
      console.log(result);
    }
  }

  componentDidMount() {
    let user = AccessToken.getCurrentAccessToken().toString()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.setState({ authenticated: true });
        // this.props.navigation.navigate('NewUser')
      } else {
        console.log("authenticated", false);
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
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
            <TouchableHighlight onPress={this._fbAuth.bind(this)}>
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

function loggedIn(result) {
  this.props.navigation.navigate('NewUser', result)
  console.log(result);
}