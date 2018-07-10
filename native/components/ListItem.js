import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

const ListItem = props => (
  <View style={itemStyles.itemTextContainer}>
    <Icon name="clear" size={20} color="indigo" />
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
  itemTextContainer: {
    flexDirection: 'row'
  },
  itemText: {
    fontFamily: 'Ubuntu',
    fontSize: 14,
    paddingLeft: 4
  }
});

export default ListItem;
