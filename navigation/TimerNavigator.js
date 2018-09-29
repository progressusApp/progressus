import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimerView from '../screens/Timer';
import TimerList from '../screens/TimerList';

export const TimerStack = createStackNavigator({
  MainView: {
    screen: createMaterialTopTabNavigator(
      {
        Timer: {
          screen: TimerView,
        },
        Lista: {
          screen: TimerList,
        },
      },
      {
        tabBarOptions: {
          labelStyle: {
            color: '#64b5f6',
            fontWeight: 'bold',
          },
          style: {
            backgroundColor: '#fff',
          },
        },
      }
    ),
    navigationOptions: ({ navigation }) => ({
      title: 'Timer',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
});

TimerStack.navigationOptions = {
  drawerLabel: 'Timer',
  drawerIcon: ({ tintColor }) => <MaterialIcons name="timer" size={24} style={{ color: tintColor }} />,
};
