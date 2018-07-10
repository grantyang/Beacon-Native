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
    this.removeInterest = this.removeInterest.bind(this);
  }

  componentDidMount() {
    this.loadUserSavedInterests('John')
  }

  componentDidUpdate(_, prevState) {
    if (this.state.interestList.length !== prevState.interestList.length) {
      this.upsertUserInDatabase(this.state.interestList);
    }
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

  removeInterest(interest) {
    this.setState({
      interestList: this.state.interestList.filter((item) => item !== interest),
      places: this.state.places.filter((place) => place.interest !== interest)
    })
  }

  async refreshPlaces(interest) {
    try {
      const res = await this.getPlacesFromAPI(interest);
      const fetchedPlaces = res.data;

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
    return axios.get('http://localhost:1337/fsquare/explore/', {
      params: {
        query: interest,
        ll: `${this.state.latitude},${this.state.longitude}`,
        radius: 20000,
        limit: this.state.limit
      }
    });
  }

  loadUserSavedInterests(user) {
    axios.get(`http://localhost:1337/saved-interests/${user}`)
    .then(res => {
      const savedInterests = res.data.savedInterests;
      for (let interest of savedInterests) {
        this.refreshPlaces(interest);
      }
      this.setState({
        interestList: savedInterests
      })
    })
  }

  upsertUserInDatabase(interests) {
    axios.post(`http://localhost:1337/saved-interests/`, {
      data: {
        user: "John",
        savedInterests: interests
      }
    });
  }

  render() {
    return (
      <View style={appStyles.container}>
        <Map places={this.state.places} />
        <Text style={appStyles.titleText}>Welcome to Beacon</Text>
        <Input addNewInterest={this.addNewInterest} />
        <List interestList={this.state.interestList} removeInterest={this.removeInterest}/>
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
