import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MainView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Witaj w aplikacji wspomagającej rozwój umiejętności!</Text>
        <Text style={styles.instructions}>Skorzystaj z menu aby zobaczyć funkcje.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    alignSelf: 'center',
    color: 'rgb(60, 167, 190)',
    fontSize: 20,
    textAlign: 'center',
  },
  topBar: {
    backgroundColor: 'yellow',
    width: '100%',
    flexDirection: 'row',
  },
  burgerIcon: {
    width: 30,
    height: 30,
  },
});
