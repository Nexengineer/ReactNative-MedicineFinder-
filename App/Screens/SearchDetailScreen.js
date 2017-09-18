'use strict';

import React, { Component, PropTypes } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  ScrollView
} from 'react-native';

var {height} = Dimensions.get('window');
var {width} = Dimensions.get('window');
class SearchDetailScreen extends Component {
  render() {
    var { name, labeler, imageUrl, attribution, ndc11} = this.props.navigation.state.params;
    return(
      <View style = {{flexDirection: 'column'}}>
        <ScrollView >
          <Text style={styles.header}>{name}</Text>
          <Image style={styles.medicineImage} source={{ uri: imageUrl }} />
          <Text style={styles.header}>{labeler}</Text>
          <Text style={styles.header}>{attribution}</Text>
        </ScrollView>
      </View>
    )};
}

const styles = StyleSheet.create({
  header:{
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  },
  medicineImage:{
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    width: width - 20,
    height: 300
  }


});
export default SearchDetailScreen;
