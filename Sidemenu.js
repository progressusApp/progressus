import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import SideMenu from 'react-native-side-menu';
import Hamburger from 'react-native-hamburger';

export default class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.closeIcon}
        <Text> DUPA wewnątrz sidebara</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(5, 201, 143)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
