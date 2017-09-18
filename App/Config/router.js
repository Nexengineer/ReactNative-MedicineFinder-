import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import DashBoard from '../Screens/DashBoard';
import SearchByName from '../Screens/SearchByName';
import SearchDetailScreen from '../Screens/SearchDetailScreen';
import SearchByChar from '../Screens/SearchByChar';
import MapScreen from '../Screens/MapScreen';
import Profile from '../Screens/Profile';


export const DashBoardStack = StackNavigator({
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      title: 'Dashboard',
      headerBackTitle: null,
    },
  },
  SearchByName: {
    screen: SearchByName,
    navigationOptions:({ navigation }) => ({
      title: 'Drug Search (Name)',
      headerBackTitle: null,
    }),
  },
  SearchDetailScreen: {
    screen: SearchDetailScreen,
    navigationOptions:({ navigation }) => ({
      title: 'Drug Detail',
      headerBackTitle: null,
    }),
  },
  SearchByChar: {
    screen: SearchByChar,
    navigationOptions:({ navigation }) => ({
      title: 'Drug Search (Apperance)',
      headerBackTitle: null,
    }),
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions:({ navigation }) => ({
      title: 'Near Hospitals',
      headerBackTitle: null,
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions:({ navigation }) => ({
      title: 'User Profile',
      headerBackTitle: null,
    }),
  },
});

export const Root = StackNavigator({
  Settings: {
    screen: DashBoardStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
