'use strict'
import React, {Component, PropTypes} from 'react';

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  AsyncStorage,
  TextInput,
  Image
} from 'react-native'

var {height, width} = Dimensions.get('window');
var heightOfSingleView = height / 15;
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:null,
      age:null,
      allergies:null,
      country:null,
      ZipCode: null,
      isEntering: false,
    }
  }

  componentDidMount = () => {
          AsyncStorage.getItem("name").then((value) => {
              this.setState({name: value});
          }).done();
          AsyncStorage.getItem("age").then((value) => {
              this.setState({age: value});
          }).done();
          AsyncStorage.getItem("allergies").then((value) => {
              this.setState({allergies: value});
          }).done();
          AsyncStorage.getItem("country").then((value) => {
              this.setState({country: value});
          }).done();
          AsyncStorage.getItem("ZipCode").then((value) => {
              this.setState({ZipCode: value});
          }).done();
  }

  saveData=(value, key)=>{
    console.log(value);
    AsyncStorage.setItem(key, value);
    switch (key) {
      case 'name':
        this.setState({name: value});
        break;
      case 'age':
        this.setState({age: value});
        break;
      case 'allergies':
        this.setState({allergies: value});
        break;
      case 'country':
        this.setState({country: value});
        break;
      case 'ZipCode':
        this.setState({ZipCode: value});
        break;
      default:
    }
  }

  render(){

    return(
      <View style = {{flex: 1, flexDirection:'column', alignItems: 'center'}}>
      <Image source={require('../Resources/menu3.png')} resizeMode='contain'>
      </Image>
      <View style={[styles.commonView,{height: heightOfSingleView, width: width}]}>
        <Text style={styles.lblStyle}>Name:   </Text>
       <TextInput style={styles.formInput} underlineColorAndroid='transparent'  placeholder= 'name'
         onChangeText={(text) => this.saveData(text,'name')}
                        value= {this.state.name} />
      </View>
      <View style={[styles.commonView,{height: heightOfSingleView, width: width}]}>
        <Text style={styles.lblStyle}>Age:   </Text>
       <TextInput style={styles.formInput} underlineColorAndroid='transparent'  placeholder= 'Age'
         onChangeText={(text) => this.saveData(text,'age')}
                        value= {this.state.age} />
      </View>
      <View style={[styles.commonView,{height: heightOfSingleView, width: width}]}>
        <Text style={styles.lblStyle}>Allergies:   </Text>
       <TextInput style={styles.formInput} underlineColorAndroid='transparent'  placeholder= 'Allergies'
         onChangeText={(text) => this.saveData(text,'allergies')}
                        value= {this.state.allergies} />
      </View>
      <View style={[styles.commonView,{height: heightOfSingleView, width: width}]}>
        <Text style={styles.lblStyle}>Country:   </Text>
       <TextInput style={styles.formInput} underlineColorAndroid='transparent' placeholder= 'Country'
         onChangeText={(text) => this.saveData(text,'country')}
                        value= {this.state.country} />
      </View>
      <View style={[styles.commonView,{height: heightOfSingleView, width: width}]}>
        <Text style={styles.lblStyle} underlineColorAndroid='transparent'>ZipCode:   </Text>
       <TextInput style={styles.formInput} underlineColorAndroid='transparent' placeholder= 'ZipCode'
         onChangeText={(text) => this.saveData(text,'ZipCode')}
                        value= {this.state.ZipCode} />
      </View>

      </View>
    )};
}
const styles = StyleSheet.create({
  formInput: {
    flex: 1,
    height: 26,
    fontSize: 15,
    padding: 2,
    marginLeft: 5,

  },
  lblStyle: {
    fontSize: 15,
    textAlign:'center'
  },
  commonView: {
    backgroundColor:'#fff',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },


});
