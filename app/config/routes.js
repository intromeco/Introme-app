import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import LoginScreen from '../routes/loginScreen/login.js';
import NewUser from '../routes/accountSetup/newUser/newUser.js';

// export const Tabs = TabNavigator({
//   LoginScreen: {
//     screen: LoginScreen,
//   }
// });

export const Stack = StackNavigator({
  LoginScreen: { 
    screen: LoginScreen,
    navigationOptions: { 
      header: null
    },
  },
  NewUser: { 
    screen: NewUser,
    navigationOptions: { 
      header: null
    },
  }
});

// export const ExistingUser = StackNavigator({
//   AccountSetup: { 
//     screen: AccountSetup 
//   }
// })