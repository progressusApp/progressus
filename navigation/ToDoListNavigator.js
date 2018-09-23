import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ToDoListView from '../screens/toDoList/ToDoList';
import NewTaskView from '../screens/toDoList/NewTask';
import Icon from 'react-native-vector-icons/Feather';

export const ToDoListStack = createStackNavigator({
  MainView: {
    screen: ToDoListView,
    navigationOptions: ({ navigation }) => ({
      title: 'Lista "to do"',
      headerLeft: (
        <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} onPress={() => navigation.openDrawer()} />
      ),
      headerRight: (
        <MaterialIcons
          name="add"
          size={30}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('NewTaskView')}
        />
      ),
    }),
  },
  NewTaskView: {
    screen: NewTaskView,
    navigationOptions: ({ navigation }) => ({
      title: 'Nowe zadanie',
      headerLeft: (
        <MaterialIcons
          name="arrow-back"
          size={30}
          style={{ marginLeft: 15 }}
          onPress={() => navigation.navigate('MainView')}
        />
      ),
    }),
  },
});

ToDoListStack.navigationOptions = {
  drawerLabel: 'Lista "to do"',
  drawerIcon: ({ tintColor }) => <Icon name="check-square" size={24} style={{ color: tintColor }} />,
};
