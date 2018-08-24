import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export default class NewTask extends React.Component {
  state = {
    taskContent: '',
    date: moment()
      .add(1, 'hours')
      .format('YYYY-MM-DD HH:mm'),
  };

  getNotification = () => {
    NotificationsAndroid.localNotification({
      title: 'Local notification',
      body: 'This notification was generated by the app!',
      extra: 'data',
    });
  };

  render() {
    const { taskContent, date } = this.state;
    return (
      <View style={styles.container}>
        {console.log(date)}
        <Text style={styles.label}>Co masz do zrobienia?</Text>
        <TextInput
          style={{ padding: 10, fontWeight: '500', marginBottom: 25 }}
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
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            console.log('date change', date);
            this.setState({ date: date });
          }}
        />
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
  },
  label: {
    color: '#64b5f6',
    fontWeight: '900',
  },
});