import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from './ListItem.js';

const List = (props) => (
  <View>
    <Text> Added So Far: </Text>
    { props.items.map(item => <ListItem key={item} item={item}/>)}
  </View>
)

export default List;