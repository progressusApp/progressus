import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';

// import CameraKitCamera from 'react-native-camera-kit';

export default class GraphicNote extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Text style={styles.buttonFont}>NOTATKA GRAFICZNA</Text>
        </View>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        />
        {/* <CameraKitCamera
          ref={cam => (this.camera = cam)}
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
          cameraOptions={{
            flashMode: 'auto', // on/off/auto(default)
            focusMode: 'on', // off/on(default)
            zoomMode: 'on', // off/on(default)
            ratioOverlay: '1:1', // optional, ratio overlay on the camera and crop the image seamlessly
            ratioOverlayColor: '#00000077', // optional
          }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    color: '#64b5f6',
    fontWeight: '900',
  },
  button: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderColor: '#c1bcbc',
  },
  buttonFont: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#64b5f6',
  },
});
