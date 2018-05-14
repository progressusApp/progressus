import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import SideMenu from 'react-native-side-menu';

export default class MainView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text>dupa </Text>
          <View style={styles.burgerIcon}>{this.props.children}</View>
        </View>
        <Text style={styles.welcome}>Welcome to React Dupa Native!</Text>
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
  },
  welcome: {
    alignItems: 'center',
    color: 'rgb(60, 167, 190)',
    fontSize: 25,
  },
  topBar: {
    backgroundColor: 'yellow',
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  burgerIcon: {
    width: 30,
    height: 30,
  },
});
