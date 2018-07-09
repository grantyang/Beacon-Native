import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';

import List from './native/components/List.js';
import Input from './native/components/Input.js';
import Map from './native/components/Map.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.7749,
      longitude: -122.4194,
      limit: 20,
      interestList: ['test item'],
      places: [
        { lat: 37.7749, lng: -122.4594, name: "Grant's Deli" },
        { lat: 37.7849, lng: -122.4494, name: 'Ramen Underground' },
        { lat: 37.7249, lng: -122.4394, name: 'El Farolito' },
        { lat: 37.7949, lng: -122.4294, name: 'The Black Cat 2' },
        { lat: 37.7649, lng: -122.4294, name: 'The Black Cat' },
        { lat: 37.7549, lng: -122.4194, name: 'Tu Lan Vietnamese' }
      ]
    };
    this.addNewInterest = this.addNewInterest.bind(this);
  }

  addNewInterest(interest) {
    const lowerCaseInterest = interest.toLowerCase();
    if (interest && !this.state.interestList.includes(lowerCaseInterest)) {
      this.getPlacesFromAPI(interest);
      this.setState(prevState => ({
        interestList: [...prevState.interestList, lowerCaseInterest]
      }));
    } else {
      alert('Interest already added');
    }
  }

  getPlacesFromAPI(interest) {
    axios
      .get(`http://localhost:1337/fsquare/explore/`, {
        params: {
          query: interest,
          ll: `${this.state.latitude},${this.state.longitude}`,
          radius: 20000,
          limit: this.state.limit
        }
      })
      .then(res => {
        const fetchedVenues = res.data.response.groups[0].items;
        console.log(fetchedVenues);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={appStyles.container}>
        <Map places={this.state.places} />
        <Text>Welcome to Beacon</Text>
        <Input addNewInterest={this.addNewInterest} />
        <List interestList={this.state.interestList} />
      </View>
    );
  }
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
