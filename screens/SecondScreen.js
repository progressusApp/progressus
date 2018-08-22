import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import SideMenu from 'react-native-side-menu';
const util = require('util');

export default class SecondScreen extends React.Component {
  static navigationOptions = {
    title: 'Second screen',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>DUPA!</Text>
        <Text style={styles.instructions}>To get started, edit index.ios.js</Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
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
    marginTop: 10,
  },
  welcome: {
    alignItems: 'center',
    color: 'rgb(60, 167, 190)',
    fontSize: 25,
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
