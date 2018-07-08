import React, { Component } from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: 'Try "craft beer" or "ramen"' 
    };
  }

  render() {
    return (
      <View>
        <TextInput
          style={inputStyles.container}
          onChangeText={(text) => this.setState({ text })}
          onFocus={() => this.setState({ text: '' })}
          value={this.state.text}
        />
        <Button
          onPress={() => addInterest()}
          title="Add Interest"
          color="indigo"
          accessibilityLabel="Add Interest"
        />
      </View>
    );
  }
}

const inputStyles = StyleSheet.create({
  container: {
    height: 36,
    width: 200,
    borderColor: 'indigo',
    borderWidth: 1,
    borderRadius: 8,
  },
});
