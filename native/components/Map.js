import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken(
  'pk.eyJ1IjoiZ3JhbnR5YW5nMSIsImEiOiJjampjM3lxMjkyMHB4M3dvaWxxOXA2cTBjIn0.R4msLIMtjPSuW6op7aC9ng'
);

export default class Map extends Component {
  renderSinglePoint(i) {
    let currentPlace = this.props.places[i];
    return (
      <Mapbox.PointAnnotation
        key={currentPlace.name}
        id="point"
        coordinate={[currentPlace.lng, currentPlace.lat]}>
        <View style={styles.pointContainer}>
          <View style={styles.pointFill} />
        </View>
        <Mapbox.Callout title={currentPlace.name} />
      </Mapbox.PointAnnotation>
    );
  }

  renderAllPoints() {
    let allPoints = [];
    for (let i = 0; i < this.props.places.length; i++) {
      allPoints.push(this.renderSinglePoint(i));
    }
    return allPoints;
  }

  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={11}
          centerCoordinate={[-122.4194, 37.7749]}
          showUserLocation={true}
          style={styles.container}>
          {this.renderAllPoints()}
        </Mapbox.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 375
  },
  pointContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  },
  pointFill: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'purple',
    transform: [{ scale: 0.6 }]
  }
});
