import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ListItem = (props) => (
  <View>
    <Text>{ props.interest }</Text>
  </View>
)

export default ListItem;