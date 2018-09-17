import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class NewNote extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('TextNote')} style={styles.button}>
          <Text style={styles.buttonFont}>NOTATKA TEKSTOWA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AudioNote')} style={styles.button}>
          <Text style={styles.buttonFont}>NOTATKA GŁOSOWA</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('GraphicNote')} style={styles.button}>
          <Text style={styles.buttonFont}>NOTATKA GRAFICZNA</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
