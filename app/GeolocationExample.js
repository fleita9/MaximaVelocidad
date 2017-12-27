import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

const RNFS = require('react-native-fs');
var interval, path;

class GeolocationExample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      counter: 0,
      values: []
    };
  }

  componentDidMount() {
    path = RNFS.DocumentDirectoryPath + '/test.json';
    interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            counter: this.state.counter + 1
          });
          this.state.values.push({lat: position.coords.latitude, lng: position.coords.longitude, timestamp: new Date().getTime()})
        },
        (error) => {
          this.setState({ error: error.message })
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                counter: this.state.counter + 1
              });
              this.state.values.push({lat: position.coords.latitude, lng: position.coords.longitude, timestamp: new Date().getTime()})
            },
            (error) => {
              this.setState({ error: error.message })
              
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 300 },
          );
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 300 },
      );
    },500)
  }

  stopInterval = () => {
    this.setState({error: "Se frenó la aplicación. Se guardó archivo en: "+path})
    clearInterval(interval);
    RNFS.writeFile(path, '{'+JSON.stringify(this.state.values)+'}', 'utf8')
    .then((success) => {
      console.log("file written in "+path)
    })
    .catch((err) => {
     console.log(err.message);
    });
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Count: {this.state.counter}</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

        <Button
          onPress={this.stopInterval}
          title="Frenar"
          color="#841584"
        />
      </View>
    );
  }
}

export default GeolocationExample;