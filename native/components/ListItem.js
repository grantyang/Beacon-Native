import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ListItem = props => (
  <View>
    <Text
      onPress={() => {
        props.removeInterest(props.interest);
        //remove places related to props.interest
      }}
      style={itemStyles.itemText}>
      {props.interest}
    </Text>
  </View>
);

const itemStyles = StyleSheet.create({
  itemText: {
    fontFamily: 'Ubuntu',
    fontSize: 14
  }
});

export default ListItem;
