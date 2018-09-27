import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class MainView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.preview} source={require('../assets/main.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    alignSelf: 'center',
    color: 'rgb(60, 167, 190)',
    fontSize: 20,
    textAlign: 'center',
  },
  textWrapper: {
    position: 'absolute',
    top: 200,
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
});
