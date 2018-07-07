import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';

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
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          onFocus={() => this.setState({text:''})}
          value={this.state.text}
        />
        <Button
          onPress={()=>this.setState({text:'pressed'})}
          title="Add Interest"
          color="#841584"
          accessibilityLabel="Add Interest"
        />
      </View>
    );
  }
}