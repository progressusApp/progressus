import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export default class NewNote extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Text style={styles.buttonFont}>NOTATKA GŁOSOWA</Text>
        </View>
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
