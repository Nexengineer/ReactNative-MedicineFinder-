'use strict';

import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

var {height} = Dimensions.get('window');
var {width} = Dimensions.get('window');
var heightOfViews = (height - 80)/3 ;
var widthOfMenuItem = (width - 30)/2;
var heightOfMenuItem = (heightOfViews - 20);
class Dashboard extends Component {
  // This is called when any screen is called
  dataToShow = (screenID) => {
    switch (screenID) {
      case 1:
          this.props.navigation.navigate('SearchByName');
        break;
      case 2:
          this.props.navigation.navigate('SearchByChar');
        break;
      case 3:
          this.props.navigation.navigate('Profile');
        break;
      case 4:
          this.props.navigation.navigate('MapScreen');
        break;
      default:
        console.log('Unknown Screen');
    }
  };

  render() {
    return (
      <View style={[{backgroundColor: '#fff', flexDirection: 'column'},
        {height: height, width: width}]}>
      {/* This is beginning of the major view*/}
        <View style={[{backgroundColor: 'rgba(52, 52, 52, 0)',
          flexDirection: 'row'}, {height: heightOfViews, width: width}]}>
          {/*This is the upper half of the view*/}
          {/*Menu 1 Button*/}
          <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={() => this.dataToShow(1)} style={{alignItems: 'center',justifyContent: 'center',width: widthOfMenuItem , height: heightOfMenuItem , marginLeft:10,borderRadius:10, marginTop: 10,borderWidth: 2,borderColor: '#3399ff'}}>
            <Image source={require('../Resources/menu1.png')} resizeMode='contain'/>
          </TouchableHighlight>
          {/*Menu 2 Button*/}
          <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={() => this.dataToShow(2)} style={{alignItems: 'center',justifyContent: 'center',width: widthOfMenuItem , height: heightOfMenuItem , marginLeft: 10,marginRight:10,borderRadius:10, marginTop: 10,borderWidth: 2,borderColor: '#7f00ff'}}>
            <Image source={require('../Resources/menu2.png')} resizeMode='contain'/>
          </TouchableHighlight>
        </View>
        <View style={[{justifyContent: 'center', flexDirection: 'row'}, {height: heightOfViews, width: width}]}>
          {/*This is the middle half of the view*/}
          {/*Menu 1 Button*/}
          <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={() => this.dataToShow(3)} style={{alignItems: 'center',justifyContent: 'center',width: widthOfMenuItem , height: heightOfMenuItem , marginLeft:10,borderRadius:10, marginTop: 5,borderWidth: 2,borderColor: '#ff9933'}}>
            <Image source={require('../Resources/menu3.png')} resizeMode='contain'/>
          </TouchableHighlight>
          {/*Menu 2 Button*/}
          <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={() => this.dataToShow(4)} style={{alignItems: 'center',justifyContent: 'center',width: widthOfMenuItem , height: heightOfMenuItem , marginLeft: 10,marginRight:10,borderRadius:10, marginTop: 5,borderWidth: 2,borderColor: '#ff3333'}}>
            <Image source={require('../Resources/menu4.png')} resizeMode='contain'/>
          </TouchableHighlight>
        </View>
        <View style={[{justifyContent: 'center'}, {height: heightOfViews, width: width}]}>
          {/*This is the Lower half of the view*/}
          <Text style={{textAlign: 'center', fontSize: 17,fontWeight: "bold",padding: 10}}>Copyright © 2017 Neeraj Mishra:
            Do not rely on App to make decisions regarding medical care.
            While data is accurate, you should assume all results are
            unvalidated. Source code is free to use, modify,
            Distribute. App is not responsible for any thing in any terms. </Text>
        </View>
      </View>
    )};
}

const styles = StyleSheet.create({

});


export default Dashboard;
