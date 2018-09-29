import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkillsView from '../screens/Skills';

export const SkillsStack = createStackNavigator({
  MainView: {
    screen: SkillsView,
    navigationOptions: ({ navigation }) => ({
      title: 'Lista umiejętności',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialIcons name="menu" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      ),
    }),
  },
});

SkillsStack.navigationOptions = {
  drawerLabel: 'Lista umiejętności',
  drawerIcon: ({ tintColor }) => <MaterialIcons name="list" size={24} style={{ color: tintColor }} />,
};
