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
import Spinner from 'react-native-loading-spinner-overlay';
import ListItem from '../Config/ListView'

// Configuring Height and wdth Constant
var {height} = Dimensions.get('window');
var {width} = Dimensions.get('window');
var topViewHeight = height/6;
var ListViewHeight = height - topViewHeight;

// This method is used for making query
function urlMaker(txtFld_name){
  const data = {
    name: txtFld_name,
  };
  var queryString = Object.keys(data).map(key => key + '='
    + encodeURIComponent(data[key])).join('&');
  return 'https://rximage.nlm.nih.gov/api/rximage/1/rxnav?' + queryString;
}

// Class Defination Starts
class SearchByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
  	  searchString: 'Aspirin',
  	  isLoading: false,
      data: [],
 	 };
  }
  // This Method will be called when ever text Changes
  _onSearchTextChanged = (event) => {
  		this.setState({ searchString: event.nativeEvent.text });
	};

  // This method will be used for webservicce call
  _executeQuery = (query) => {
		console.log(query);
    this.setState({ isLoading: true });
    fetch(query).then(response => response.json()).then(json => this._handleResponse(json)).
      catch(error =>
        this.setState({
				isLoading: false
			})
    );
  };

  // This method is used for hadling reponse data
  _handleResponse = (response) => {
    this.setState({ isLoading: false });
    if (response.replyStatus.success) {
      this.setState({data: response});
      console.log('Properties Found: ' + response.nlmRxImages);
    } else {
      console.log('Check Internet connection');
    }
  };

  // This method is used when search is pressed
  _onSearchPressed = () => {
  		const query = urlMaker(this.state.searchString);
  		this._executeQuery(query)
  };

  // This method is used for handling tableview
  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    		<ListItem
          type = 'medicine'
    		  item={item}
    		  index={index}
    		  onPressItem={this._onPressItem}
    		/>
  	);

  _onPressItem = (index) => {
 		console.log("Pressed row: "+index);
    this.props.navigation.navigate('SearchDetailScreen', this.state.data.nlmRxImages[index]);
  };

  // View Render method
  render(){
    // Loading View
    const spinner = this.state.isLoading ? <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} /> : null;
    return(
      <View style={[styles.mainContainer,styles.mainContainerFrame]}>
        {spinner}
        {/*This is used to make header View*/}
        <View style= {[{backgroundColor:'#fff', flexDirection: 'column'},{height: topViewHeight, width: width}]}>
          <Text style={{padding: 10, textAlign: 'center', fontSize: 18}}>
            Enter drug name
          </Text>
          <View style={styles.flowRight}>
					  <TextInput
  					  style={styles.searchInput}
 						  onChange={this._onSearchTextChanged}
 						  placeholder='Search via Drug Name'/>
					  <Button
              styles={{marginRight: 10}}
						  onPress= {this._onSearchPressed}
						  color= '#48BBEC'
						  title= 'Go'
					  />
				  </View>
        </View>
        {/*----------------------------------------*/}
        {/*This is the rest of view*/}
        <View  style={{height: ListViewHeight, width: width}}>
          <FlatList
			       data = {this.state.data.nlmRxImages}
			       keyExtractor = {this._keyExtractor}
			       renderItem={this._renderItem}
		      />
        </View>
      </View>
    )};
}

// style sheet for this View
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  mainContainerFrame: {
    height: height,
    width: width
  },
  flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
    justifyContent:'center'
	},
  searchInput: {
		height: 36,
		padding: 4,
		marginRight: 2,
    marginLeft:5,
		flexGrow: 1,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: "#48BBEC",
	},
});

export default SearchByName
