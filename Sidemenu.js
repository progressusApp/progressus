import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import SideMenu from 'react-native-side-menu';
import Hamburger from 'react-native-hamburger';

export default class ContentView extends React.Component {
  navigate = () => {};

  render() {
    console.log('dupa', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.closeIcon}>{this.props.closeIcon}</View>
        <View style={styles.list}>
          <TouchableOpacity onPress={this.navigate} activeOpacity={0.5}>
            <Text style={styles.itemOnList}>To do list</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigate} activeOpacity={0.5}>
            <Text style={styles.itemOnList}>Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigate} activeOpacity={0.5}>
            <Text style={styles.itemOnList}>Planner</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#039be5',
    paddingTop: 30,
  },
  closeIcon: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  list: {
    padding: 40,
  },
  itemOnList: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    color: '#ffffff',
  },
});
