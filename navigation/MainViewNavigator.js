import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, SafeAreaView } from 'react-navigation';
import MainView from '../screens/MainView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const MainViewStack = createStackNavigator({
  MainView: {
    screen: MainView,
    navigationOptions: ({ navigation }) => ({
      title: 'Progressus',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
});

MainViewStack.navigationOptions = {
  drawerLabel: 'Strona główna',
  drawerIcon: ({ tintColor }) => <MaterialIcons name="home" size={24} style={{ color: tintColor }} />,
};
