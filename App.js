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
      limit: 10,
      interestList: [],
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
      this.refreshPlaces(lowerCaseInterest);
      this.setState(prevState => ({
        interestList: [...prevState.interestList, lowerCaseInterest]
      }));
    } else {
      alert('Interest already added');
    }
  }

  async refreshPlaces(interest) {
    try {
      const res = await this.getPlacesFromAPI(interest);
      const fetchedPlaces = res.data.response.group.results;

      let formattedFetchedPlaces = fetchedPlaces.map(
        ({venue: {id, name, location: {lat, lng}}}) => ({
          id, name, lat, lng, interest}));

      this.setState(prevState => ({
        places: prevState.places.concat(formattedFetchedPlaces)
      }));
    } catch (err) {
      console.log(err);
    }
  }

  getPlacesFromAPI(interest) {
    return axios.get(`http://localhost:1337/fsquare/explore/`, {
      params: {
        query: interest,
        ll: `${this.state.latitude},${this.state.longitude}`,
        radius: 20000,
        limit: this.state.limit
      }
    });
  }

  render() {
    return (
      <View style={appStyles.container}>
        <Map places={this.state.places} />
        <Text style={appStyles.titleText}>Welcome to Beacon</Text>
        <Input addNewInterest={this.addNewInterest} />
        <List interestList={this.state.interestList} />
      </View>
    );
  }
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  titleText: {
    marginTop: 6,
    fontFamily: 'Ubuntu',
    color: 'indigo',
    fontSize: 20
  }
});
