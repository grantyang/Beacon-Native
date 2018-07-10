import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ListItem = props => (
  <View>
    <Text style={itemStyles.itemText}>{props.interest}</Text>
  </View>
);

const itemStyles = StyleSheet.create({
  itemText: {
    fontFamily: 'Ubuntu',
    fontSize: 14
  }
});

export default ListItem;
