import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import List from './native/components/List.js';
import Input from './native/components/Input.js';
import Map from './native/components/Map.js';
import InputModal from './native/components/InputModal.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      latitude: 37.7749,
      longitude: -122.4194,
      limit: 10,
      interestList: [],
      places: [],
    };
    this.addNewInterest = this.addNewInterest.bind(this);
    this.removeInterest = this.removeInterest.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (this.state.currentUser !== prevState.currentUser) {
      this.loadUserSavedInterests(this.state.currentUser);
    }
    if (this.state.interestList.length !== prevState.interestList.length) {
      this.upsertUserInDatabase(this.state.interestList);
    }
  }

  setCurrentUser(name) {
    this.setState({currentUser: name})
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
      console.log('There was an error:', err);
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
    })
    .catch(err => {
      console.log('There was an error:', err)
    })
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
    .catch(err => {
      console.log('There was an error:', err)
    })
  }

  upsertUserInDatabase(interests) {
    axios.post(`http://localhost:1337/saved-interests/`, {
      data: {
        user: this.state.currentUser,
        savedInterests: interests
      }
    });
  }

  render() {
    return (
      <View style={appStyles.container}>
        <InputModal setCurrentUser={this.setCurrentUser} />
        <Text style={appStyles.titleText}>Beacon</Text>
        <Input addNewInterest={this.addNewInterest} />
        <List interestList={this.state.interestList} removeInterest={this.removeInterest}/>
        <Map places={this.state.places} />
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
    marginTop: 16,
    fontFamily: 'Ubuntu',
    color: 'indigo',
    fontSize: 26
  }
});
