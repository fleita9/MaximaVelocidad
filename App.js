/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps'
import Dimensions from 'Dimensions';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const { width, height } = Dimensions.get('window');

var ASPECT_RATIO = width / height;
let LATITUDE;
let LONGITUDE;
let LATITUDE_DELTA = 0.2922;
let LONGITUDE_DELTA;

export default class App extends Component<{}> {

   constructor(props) {
    super(props);

    this.state = {
      mapType: 'standard'
    }
  }

  componentWillMount() {
    LATITUDE = -34.593168;
    LONGITUDE = -58.4104707;
    LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  }

  render() {
    return (
      <View>
        <MapView
          ref={'mapview'}
          customMapStyle={[] /* require('../jsons/mapStyle.json') */}
          style={styles.map}
          mapType={this.state.mapType}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
