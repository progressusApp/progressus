import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';

import Sidemenu from '../Sidemenu';
import MainView from '../MainView';
import Hamburger from 'react-native-hamburger';
import NavigationBar from 'react-native-navbar';
import { StackNavigator } from 'react-navigation';

class Dupa extends React.Component {
  static navigationOptions = {
    title: 'dupa screen',
  };
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
            <Image source={require('../assets/icons/close.png')} />
          </TouchableOpacity>
        }
      />
    );
    const burgerIcon = (
      <TouchableOpacity onPress={this.toggleSidemenuState} activeOpacity={0.5}>
        <Image source={require('../assets/icons/menu.png')} />
      </TouchableOpacity>
    );
    const titleConfig = {
      title: 'Dupa :)',
    };
    return (
      <SideMenu menu={menu} isOpen={this.state.isSidemenuOpen}>
        <NavigationBar title={titleConfig} leftButton={burgerIcon} containerStyle={styles.navbar} />
        <View style={styles.container}>
          {/* <StatusBar hidden={true} /> */}
          <MainView>
            <TouchableOpacity onPress={this.toggleSidemenuState} activeOpacity={0.5}>
              <Image source={require('../assets/icons/menu.png')} />
            </TouchableOpacity>
          </MainView>
          <Text>ejno</Text>
        </View>
      </SideMenu>
    );
  }
}

const DupaStackNavigator = StackNavigator({
  Dupa: { screen: Dupa },
});

export default DupaStackNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    backgroundColor: '#039be5',
    paddingTop: 30,
  },
});
