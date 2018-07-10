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
      places: []
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
      
      let fetchedPlacesFiltered = fetchedPlaces.map(
        ({venue: {id, name, location: {lat, lng}}}) => ({
          id, name, lat, lng, interest}));

      this.setState(prevState => ({
        places: prevState.places.concat(fetchedPlacesFiltered)
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
