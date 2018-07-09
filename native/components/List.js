import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './ListItem.js';

const List = (props) => (
  <View>
    <Text> Added So Far: </Text>
    { props.interestList.map(interest => <ListItem key={interest} interest={interest}/>)}
  </View>
)

export default List;