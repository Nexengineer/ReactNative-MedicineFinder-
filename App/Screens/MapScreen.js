'use strict'
import MapView from 'react-native-maps';
import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native'

import Spinner from 'react-native-loading-spinner-overlay';

const {height, width} = Dimensions.get('window');
export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLog: null,
      pharmaData: []
    }
  }
  // Webservice call method
  _executeQuery = (query) => {
    console.log(query);
    fetch(query).then(response => response.json()).then(json => this._handleResponse(json)).
      catch(error =>
        this.setState({
      })
    );
  };
  // This method is used for hadling reponse data
  _handleResponse = (response) => {
    if (response.status == 'OK') {
      console.log('Properties Found: ' + response.results);
      this.setState({pharmaData: response.results});
    } else {
      console.log('Check Internet connection');
    }
  };

  // below method is used for map monitoring
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
    let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  onRegionChange(region, lastLat, lastLong) {
  this.setState({
    mapRegion: region,
    lastLat: lastLat || this.state.lastLat,
    lastLong: lastLong || this.state.lastLong
  });
  this._executeQuery('https://maps.googleapis.com/maps/api/place/search/json?location='
  +this.state.lastLat+','+this.state.lastLong
  +'&radius=500&types=pharmacy&sensor=true&key=AIzaSyAcO7glhPdyoE7VEt8Ie0jMFnS4Ig3i2os')
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getCoordinate =(coordinates) => {
    return { latitude: Number(coordinates.geometry.location.lat),
             longitude: Number(coordinates.geometry.location.lng)
            };
  }
  getRating = (coordinates) => {
    return ('Rating: '+coordinates.rating);
  }

  render(){
    return(
      <View style={{flex: 1,position: 'absolute'}}>
        <MapView style={{height: height, width: width, marginTop: 2,position: 'absolute'}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region= {this.state.mapRegion}
        ref="map"
        mapType="standard"
        zoomEnabled={true}
        pitchEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsCompass={true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        >
        {this.state.pharmaData.map(marker => (
          <MapView.Marker
          coordinate={this.getCoordinate(marker)}
          title={marker.name}
          description= {this.getRating(marker)}
          key={marker.id}
          />
        ))}
        </MapView>
      </View>
    )};
}

const styles = StyleSheet.create({
});
