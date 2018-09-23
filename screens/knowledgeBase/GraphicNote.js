import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Picker,
  ActionSheetIOS,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { addNote } from '../../store/actions';
import { connect } from 'react-redux';

class GraphicNoteView extends React.Component {
  state = {
    noteTitle: '',
    categoryName: 'Kliknij by wybrać kategorię',
    noteContent: null,
  };

  savePicture = () => {
    if (this.state.noteContent) {
      const category = this.props.skillsCategories.filter(skill => skill.title === this.state.categoryName);
      this.props.addNote(category[0].id, this.state.noteTitle, 'graphic', this.state.noteContent);
      this.props.navigation.navigate('MainView');
    }
  };

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ noteContent: data.uri });
    }
  };

  handlePickerChange = categoryName => {
    this.setState({ categoryName: categoryName });
  };

  openiOSPicker = () => {
    const { skillsCategories } = this.props;
    const skillsOptions = skillsCategories.map(category => category.title);
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...skillsOptions, 'Cancel'],
        cancelButtonIndex: skillsOptions.length,
      },
      buttonIndex => {
        this.setState({ categoryName: skillsOptions[buttonIndex] });
      }
    );
  };

  renderiOSPicker = () => {
    return (
      <TouchableOpacity onPress={this.openiOSPicker} style={styles.categoryPickeriOS}>
        <Text>{this.state.categoryName}</Text>
      </TouchableOpacity>
    );
  };

  renderAndroidPicker = () => {
    const { skillsCategories } = this.props;
    return (
      <Picker selectedValue={this.state.categoryName} onValueChange={itemValue => this.handlePickerChange(itemValue)}>
        {skillsCategories.map(category => (
          <Picker.Item label={category.title} value={category.title} key={category.id} />
        ))}
      </Picker>
    );
  };

  renderNativePicker = () => {
    if (Platform.OS === 'ios') {
      return this.renderiOSPicker();
    } else if (Platform.OS === 'android') {
      return this.renderAndroidPicker();
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.label}>Tytuł notatki</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => this.setState({ noteTitle: value })}
            value={this.state.noteTitle}
            placeholder="Tytuł"
          />
          <Text style={styles.label}>Wybierz kategorię</Text>
          {this.renderNativePicker()}
          {this.state.noteContent !== null && <Image style={styles.preview} source={{ uri: this.state.noteContent }} />}
          {this.state.noteContent !== null && (
            <View>
              <TouchableOpacity onPress={this.savePicture} style={styles.capture}>
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
              flashMode={RNCamera.Constants.FlashMode.auto}
            />
          )}
          {this.state.noteContent === null && (
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}>Zrób zdjęcie</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  skillsCategories: state.skillsCategories,
});

const mapDispatchToProps = { addNote };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphicNoteView);

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
  categoryPickeriOS: {
    height: 30,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: '#c1bcbc',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
});
