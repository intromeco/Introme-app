import React, { Component } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import images from '../../../config/images.js';
import styles from './styles.js';

export default class newUser extends Component {

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={images.background.small}>
          <View style={styles.loginSection}>
            <Image
              style={styles.backgroundImage}
              source={images.icons.camera}
            />
          </View>
        </Image>
        <View style={styles.background}>
          <Text>Hi! {this.props.navigation.state.params.first_name}</Text>
          <Text>Let’s get to know you better so that we can match you with other people who like your shit.</Text>
        </View>
        <TouchableHighlight style={styles.button}>
          <View>
            <Button
              title="Let's Do This"
            />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}