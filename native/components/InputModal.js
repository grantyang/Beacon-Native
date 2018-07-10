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
  state = {
    modalVisible: true
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="none"
          transparent={true}
          presentationStyle="overFullScreen"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={modalStyles.view}>
            <View>
              <Text style={modalStyles.modalTopText}>Please enter your name:</Text>
              <TextInput
                style={modalStyles.modalInput}
                onChangeText={text => this.setState({ text })}
                onFocus={() => this.setState({ text: '' })}
                value={this.state.text}
              />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={modalStyles.modalBottomText}>Submit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    color: 'indigo',
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
