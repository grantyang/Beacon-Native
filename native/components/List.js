import React from 'react';
import { View } from 'react-native';
import ListItem from './ListItem.js';

const List = props => (
  <View>
    {props.interestList.map(interest => (
      <ListItem key={interest} interest={interest} />
    ))}
  </View>
);

export default List;
