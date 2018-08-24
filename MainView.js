import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MainViewScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to React Dupa Native!</Text>
    <Text style={styles.instructions}>To get started, edit index.ios.js</Text>
    <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+Control+Z for dev menu DUPA
    </Text>
  </View>
);

const MainViewStack = createStackNavigator({
  MainView: {
    screen: MainViewScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Progress Control App',
      headerLeft: (
        <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />
      ),
    }),
  },
});

MainViewStack.navigationOptions = {
  drawerLabel: 'Strona główna',
  drawerIcon: ({ tintColor }) => <MaterialIcons name="home" size={24} style={{ color: tintColor }} />,
};

export default MainViewStack;

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
    width: '100%',
    flexDirection: 'row',
  },
  burgerIcon: {
    width: 30,
    height: 30,
  },
});
