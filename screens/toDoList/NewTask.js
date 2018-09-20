import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export default class NewTask extends React.Component {
  state = {
    taskContent: '',
    date: moment()
      .add(1, 'hours')
      .format('YYYY-MM-DD HH:mm'),
  };

  addTask = () => {
    const { addTask } = this.props;
    const { taskContent, date } = this.state;
    AsyncStorage.getItem('@toDoTasks').then(tasks => {
      const toDoTasks = [JSON.parse(tasks), { date, done: false, id: tasks.length }];
      AsyncStorage.setItem('@toDoTasks', JSON.stringify(toDoTasks)).then(() => {
        this.props.navigation.navigate('MainView');
      });
    });
    // addTask({ taskContent, date, done: false });
  };

  render() {
    const { taskContent, date } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Co masz do zrobienia?</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => this.setState({ taskContent: value })}
          value={taskContent}
          multiline={true}
        />
        <Text style={styles.label}>Termin zakończenia</Text>
        <DatePicker
          style={{ width: 300 }}
          date={date}
          mode="datetime"
          placeholder="Wybierz datę"
          confirmBtnText="Potwierdź"
          cancelBtnText="Anuluj"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginRight: 40,
              borderWidth: 0,
              borderBottomWidth: 1,
            },
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
        <View style={styles.button}>
          <Button onPress={() => this.addTask()} title="Dodaj" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#fff',
  },
  label: {
    color: '#64b5f6',
    fontWeight: '900',
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
  },
});
