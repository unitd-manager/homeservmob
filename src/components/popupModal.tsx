// Modal.js
import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
} from 'react-native';

type RootParamList = {
  visible: boolean;
  dismiss: () => void;
  children: any;
};

class MyModal extends React.Component<RootParamList> {
  render() {
    const {props} = this;
    return (
      <Modal
        visible={props.visible}
        transparent={true}
        onRequestClose={() => props.dismiss}
        animationType={'fade'}>
        <TouchableWithoutFeedback onPress={() => props.dismiss()}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <TouchableOpacity
          onPress={() => props.dismiss()}
          style={styles.modalContent}>
          {props.children}
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default MyModal;
