import React from 'react';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import MainView from '../screens/MainView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const MainViewStack = createStackNavigator({
  MainView: {
    screen: MainView,
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
