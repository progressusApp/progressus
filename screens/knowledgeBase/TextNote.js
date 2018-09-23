import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  Platform,
  ActionSheetIOS,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { addNote } from '../../store/actions';
import { connect } from 'react-redux';

class TextNoteView extends React.Component {
  state = {
    categoryName: 'Kliknij by wybrać kategorię...',
    noteContent: '',
    noteTitle: '',
  };

  handlePickerChange = categoryName => {
    this.setState({ categoryName: categoryName });
  };

  addNote = () => {
    const category = this.props.skillsCategories.filter(skill => skill.title === this.state.categoryName);
    this.props.addNote(category[0].id, this.state.noteTitle, 'text', this.state.noteContent);
    this.props.navigation.navigate('MainView');
  };

  openiOSPicker = () => {
    const { skillsCategories } = this.props;
    const skillsOptions = skillsCategories.map(category => category.title);
    return ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...skillsOptions, 'Anuluj'],
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
    const { skillsCategories } = this.props;
    return (
      // <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.label}>Treść</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={value => this.setState({ noteContent: value })}
            value={this.state.noteContent}
            multiline={true}
            underlineColorAndroid="transparent"
            placeholder="Zacznij pisać..."
          />
          <Text style={styles.label}>Wybierz kategorię</Text>
          {this.renderNativePicker()}
          <Text style={styles.label}>Tytuł notatki</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => this.setState({ noteTitle: value })}
            value={this.state.noteTitle}
            placeholder="Tytuł"
          />
          <View style={styles.button}>
            <Button onPress={() => this.addNote()} title="Dodaj" />
          </View>
        </View>
      </TouchableWithoutFeedback>
      // </KeyboardAvoidingView>
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
)(TextNoteView);

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
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInput: {
    height: 150,
    borderColor: '#c1bcbc',
    borderWidth: 0.5,
    alignItems: 'flex-end',
    padding: 10,
    justifyContent: 'flex-end',
    textAlignVertical: 'top',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 30,
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
