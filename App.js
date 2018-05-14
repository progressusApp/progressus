import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';

import Sidemenu from './Sidemenu';
import MainView from './MainView';
import Hamburger from 'react-native-hamburger';
import NavigationBar from 'react-native-navbar';

class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSidemenuOpen: false };
  }

  toggleSidemenuState = () => {
    this.setState({
      ...this.state,
      isSidemenuOpen: !this.state.isSidemenuOpen,
    });
  };

  render() {
    const menu = (
      <Sidemenu
        closeIcon={
          <TouchableOpacity onPress={this.toggleSidemenuState} activeOpacity={0.5}>
            <Image source={require('./assets/icons/close.png')} />
          </TouchableOpacity>
        }
      />
    );

    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="dark-content" hidden={false} /> */}
        {/* <StatusBar barStyle="dark-content" hidden={false} /> */}
        <SideMenu menu={menu} isOpen={this.state.isSidemenuOpen}>
          <StatusBar backgroundColor="blue" barStyle="light-content" />
          {/* <NavigationBar
            title="dupa :)"
            rightButton={<Image source={require('./assets/icons/close.png')} />}
            containerStyle={styles.navbar}
          /> */}
          <MainView>
            {/* <Hamburger active={this.state.isSidemenuOpen} onPress={this.toggleSidemenuState} /> */}
            <TouchableOpacity onPress={this.toggleSidemenuState} activeOpacity={0.5}>
              <Image source={require('./assets/icons/menu.png')} />
            </TouchableOpacity>
          </MainView>
          <Text>dupa {String(this.state.isSidemenuOpen)}</Text>
        </SideMenu>
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
  navbar: {
    backgroundColor: 'red',
    flex: 1,
  },
});
