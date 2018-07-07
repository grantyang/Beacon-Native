import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import List from './native/components/List.js';
import Input from './native/components/Input.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:['beer','ramen']
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Beacon</Text>
        <Input />
        <List items={this.state.items}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'wheat',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
