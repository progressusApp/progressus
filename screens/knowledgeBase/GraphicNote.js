import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { RNCamera } from 'react-native-camera';

// import CameraKitCamera from 'react-native-camera-kit';

export default class GraphicNote extends React.Component {
  state = {
    noteTitle: '',
    noteContent: null,
  };
  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ noteContent: data.uri });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Tytuł notatki</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => this.setState({ noteTitle: value })}
          value={this.state.noteTitle}
          placeholder="Tytuł"
        />
        {this.state.noteContent !== null && <Image style={styles.preview} source={{ uri: this.state.noteContent }} />}
        {this.state.noteContent !== null && (
          <View>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}>Zapisz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ noteContent: null })} style={styles.capture}>
              <Text style={{ fontSize: 14 }}>Nowe zdjęcie</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.noteContent === null && (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
          />
        )}
        {this.state.noteContent === null && (
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>Zrób zdjęcie</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    marginBottom: 0,
  },
  input: {
    padding: 10,
    fontWeight: '500',
    marginBottom: 25,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: '#c1bcbc',
  },
});
