
'use strict';

import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  Button,
  FlatList
} from 'react-native';

export default class ListView extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  _medicineTypeTableCell = () => {
  }

  render(){
    var type = this.props.type;
    var item = this.props.item;
        if (type == 'medicine'){
          if (item.name == ''){
            item.name = "Name Not Specified";
          }
          item.name = (item.name.split('/'))[0];
         return (<TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={{ uri: item.imageUrl }} />
              <View style={styles.textContainer}>
                <Text style={styles.price}>{item.name}</Text>
              </View>
             </View>
            <View style={styles.separator}/>
           </View>
        </TouchableHighlight>)
      } else if (type == 'list'){
        return(<TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.newprice}>{item}</Text>
              </View>
             </View>
            <View style={styles.separator}/>
           </View>
        </TouchableHighlight>)
      }
 };
}

const styles = StyleSheet.create({
  thumb: {
		width: 80,
		height: 80,
		marginRight: 10,
	},
	textContainer:{
		flex: 1
	},
	separator:{
		height: 1,
		backgroundColor:"#dddddd"
	},
	price: {
		fontSize:25,
		fontWeight:'bold',
		color: '#656565'
	},
  newprice: {
		fontSize:25,
		fontWeight:'bold',
		color: '#656565',
    textAlign: 'center'
	},
	title:{
		fontSize: 20,
		color: '#656565'
	},
	rowContainer:{
		flexDirection:'row',
		padding: 10
	},
});
