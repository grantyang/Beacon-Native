import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

export default class InputModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      text: ''
    };
  }

  onModalSubmit() {
    this.props.setCurrentUser(this.state.text);
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <View>
        <Modal
          transparent={true}
          presentationStyle="overFullScreen"
          visible={this.state.modalVisible}>
          <View style={modalStyles.view}>
            <Text style={modalStyles.modalTopText}>
              Please enter your name:
            </Text>
            <TextInput
              style={modalStyles.modalInput}
              onChangeText={text => this.setState({ text })}
              onFocus={() => this.setState({ text: '' })}
              value={this.state.text}
            />
            <TouchableHighlight
              onPress={() => {
                this.onModalSubmit();
              }}>
              <Text style={modalStyles.modalBottomText}>Submit!</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const modalStyles = StyleSheet.create({
  view: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 48,
    marginLeft: 32,
    width: '85%',
    height: 100,
    backgroundColor: 'whitesmoke',
    borderColor: 'grey',
    borderWidth: 1
  },
  modalTopText: {
    marginTop: 2,
    fontFamily: 'Ubuntu',
    color: 'indigo',
    fontSize: 17
  },
  modalBottomText: {
    marginTop: 6,
    fontFamily: 'Ubuntu',
    color: 'green',
    fontSize: 15
  },
  modalInput: {
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
