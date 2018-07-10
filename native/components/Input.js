import React, { Component } from 'react';
import { Button, TextInput, StyleSheet, View } from 'react-native';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Try "craft beer" or "burrito"'
    };
  }

  addInterestButtonClicked() {
    // Clear out input and add interest to app state
    this.setState({
      text: ''
    });
    this.props.addNewInterest(this.state.text);
  }

  render() {
    return (
      <View>
        <TextInput
          style={inputStyles.textInput}
          onChangeText={text => this.setState({ text })}
          onFocus={() => this.setState({ text: '' })}
          value={this.state.text}
        />
        <Button
          onPress={() => this.addInterestButtonClicked()}
          title="Add Interest"
          color="indigo"
          accessibilityLabel="Add Interest"
        />
      </View>
    );
  }
}

const inputStyles = StyleSheet.create({
  textInput: {
    marginTop: 6,
    paddingLeft: 12,
    height: 36,
    width: 200,
    borderColor: 'indigo',
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: 'Ubuntu',
    fontSize: 14
  }
});
