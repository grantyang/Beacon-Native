import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListItem from './ListItem.js';

const List = props => (
  <View style={listStyles.container}>
    {props.interestList.map(interest => (
      <ListItem
        key={interest}
        interest={interest}
        removeInterest={props.removeInterest}
      />
    ))}
  </View>
);

const listStyles = StyleSheet.create({
  container: {
    marginBottom: 4
  }
});

export default List;
