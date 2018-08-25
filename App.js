import React from 'react';
import { Button, ScrollView, StatusBar, Text, View } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { KeepAwake } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from './reducer';

import MainViewStack from './MainView';
import ToDoListStack from './screens/toDoList/ToDoList';
import SkillsStack from './screens/Skills';

const store = createStore(reducer);

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DrawerExample />
      </Provider>
    );
  }
}

const DrawerExample = createDrawerNavigator(
  {
    Home: {
      path: '/main',
      screen: MainViewStack,
    },
    ToDoList: {
      path: '/todo',
      screen: ToDoListStack,
    },
    Skills: {
      path: '/skills',
      screen: SkillsStack,
    },
  },
  {
    initialRouteName: 'Home',
    drawerWidth: 210,
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

DrawerExample.navigationOptions = {
  header: null,
};
