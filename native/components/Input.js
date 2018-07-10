import React, { Component } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Try "craft beer" or "good place to work"'
    };
  }

  addInterestButtonClicked() {
    this.props.addNewInterest(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <View style={inputStyles.textInputContainer}>
        <TextInput
          style={inputStyles.textInput}
          onChangeText={text => this.setState({ text })}
          onFocus={() => this.setState({ text: '' })}
          value={this.state.text}
        />
        <Icon
          iconStyle={inputStyles.icon}
          name="add-location"
          underlayColor="darkpurple"
          size={36}
          color="indigo"
          onPress={() => this.addInterestButtonClicked()}
        />
      </View>
    );
  }
}

const inputStyles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row'
  },
  icon: {
    paddingTop: 2
  },
  textInput: {
    marginTop: 3,
    paddingLeft: 12,
    height: 36,
    width: 275,
    borderColor: 'indigo',
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: 'Ubuntu',
    fontSize: 14
  }
});
