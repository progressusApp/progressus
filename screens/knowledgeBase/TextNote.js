import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker } from 'react-native';

export default class TextNote extends React.Component {
  state = {
    categoryName: '',
    noteContent: '',
    noteTitle: '',
  };

  handlePickerChange = categoryName => {
    this.setState({ categoryName: categoryName });
  };

  addNote = () => {
    console.log('category name ', this.state.categoryName);
    // console.log('category name ', this.state.categoryName)
    const category = this.props.skillsCategories.filter(skill => skill.title === this.state.categoryName);
    this.props.addNote(category[0].id, this.state.noteTitle, 'text', this.state.noteContent);
  };

  render() {
    const { skillsCategories } = this.props;
    return (
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
        <Picker selectedValue={this.state.categoryName} onValueChange={itemValue => this.handlePickerChange(itemValue)}>
          {skillsCategories.map(category => (
            <Picker.Item label={category.title} value={category.title} key={category.id} />
          ))}
        </Picker>
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
    fontSize: 14,
    fontWeight: 'bold',
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
  textInput: {
    flex: 0.6,
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
    marginTop: 50,
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
