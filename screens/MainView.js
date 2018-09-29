import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class MainView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.picture} source={require('../assets/main.png')} />
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
  picture: {
    flex: 1,
  },
});
