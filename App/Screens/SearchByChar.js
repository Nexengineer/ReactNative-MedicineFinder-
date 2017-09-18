'use strict'

import React, {Component, PropTypes} from 'react';

// These are the elements we will be using in this js.
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Button,
  TouchableHighlight,
  FlatList
} from 'react-native'

// This is the spinner.
import Spinner from 'react-native-loading-spinner-overlay';
import ListItem from '../Config/ListView'

const {height, width} = Dimensions.get('window');

// This method is used for making query
function urlMaker(color, shape){
  const data = {
    color: color,
    shape: shape,
  };
  var queryString = Object.keys(data).map(key => key + '='
    + encodeURIComponent(data[key])).join('&');
  return 'https://rximage.nlm.nih.gov/api/rximage/1/rxnav?' + queryString;
}
// Class defination.
export default class SearchByChar extends Component {
  // This is the constructor method for this class
  constructor(props) {
    super (props);
    this.state = {
      color: 'RED',
      shape: 'OVAL',
      typeTableView: '',
      isLoading: false,
      data:[],
    }
  }
  // Webservice call method
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
      this.setState({type:'medicine'});
      this.setState({data: response});
      console.log('Properties Found: ' + response.nlmRxImages);
    } else {
      console.log('Check Internet connection');
    }
  };
  // Below methods are used for handling tableview
  // This is the way of react native to handle indexes ID
  _keyExtractor = (item, index) => index;
  // This is like cellForRowAtIndexPath (iOS) and adapterView(Android)
  _renderItem = ({item, index}) => (
    		<ListItem
          type = {this.state.type}
    		  item={item}
    		  index={index}
    		  onPressItem={this._onPressItem}
    		/>
  	);
  // This method is trigered when onPress is called
  _onPressItem = (index) => {
 		console.log("Pressed row: "+index);
    if (this.state.type == 'list') {
      if (this.state.typeTableView == 'color'){
        this.setState({color:this.state.data.nlmRxImages[index]});
      } else {
        this.setState({shape:this.state.data.nlmRxImages[index]});
      }
    } else {
      this.props.navigation.navigate('SearchDetailScreen',
        this.state.data.nlmRxImages[index]);
    }
  };

  // Button Pressed Method
  bttnPressedOptions = (index) => {
    switch(index) {
      case 1:
        this.setState({type:'list'});
        this.setState({typeTableView: 'color'});
        this.setState({data: {"nlmRxImages": ['BLACK','BLUE','BROWN',
          'GRAY','GREEN','ORANGE','PINK','PURPLE','RED','TURQUOISE','WHITE','YELLOW']}})
        console.log("data found"+this.state.data);
      break;
      case 2:
        this.setState({type:'list'});
        this.setState({typeTableView: 'shape'});
        this.setState({data: {"nlmRxImages": ['BULLET',
          'CAPSULE','CLOVER','DIAMOND','FREEFORM','GEAR','HEPTAGON','HEXAGON','OCTAGON','OVAL','PENTAGON',
          'ROUND']}})
      break;
      case 3:
      const query = urlMaker(this.state.color, this.state.shape);
  		this._executeQuery(query)
      break;
    }
  };
  // This method is used for rendering UI
  render() {
    const spinner = this.state.isLoading ? <Spinner visible={this.state.isLoading}
      textContent={"Loading..."} textStyle={{color: '#FFF'}} /> : null;
    return(
      <View style={styles.mainContainer}>
        {spinner}
        {/*This is the main Container*/}
        <Text style={{textAlign: 'center', fontSize: 17}}> Please enter apperance. </Text>
        {/*This is the TopView */}
        <View style={[styles.topContainer,{height: height/15, width: width}]}>
          <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)'
           onPress={() => this.bttnPressedOptions(1)}  style={styles.menuBttn}>
              <Text style={{fontSize:20}}>{this.state.color}</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)'
           onPress={() => this.bttnPressedOptions(2)} style={styles.menuBttn}>
              <Text style={{fontSize:20}}>{this.state.shape}</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)'
         onPress={() => this.bttnPressedOptions(3)} style={styles.submit}>
            <Text style={{fontSize:25}}>SUBMIT</Text>
        </TouchableHighlight>
        {/*This is the bottom TableView*/}
        <View style={{marginTop: 10}}>
        <FlatList
           data = {this.state.data.nlmRxImages}
           keyExtractor = {this._keyExtractor}
           renderItem={this._renderItem}
        />
        </View>
      </View>
    )};
}

// This is the method which will be carring all the style sheets.
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  topContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent:'center'
  },
  menuBttn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:5,
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#3399ff',
    width: width/2 - 10
  },
  submit: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:10,
    borderRadius:10,
    backgroundColor: '#58c69f',
    width: width - 20,
    marginTop: 10
  },
});
