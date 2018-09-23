import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { MainViewStack } from './MainViewNavigator';
import { ToDoListStack } from './ToDoListNavigator';
import { SkillsStack } from './SkillsNavigator';
import { TimerStack } from './TimerNavigator';
import { KnowledgeBaseStack } from './KnowledgeBaseNavigator';

export const DrawerNavigator = createDrawerNavigator(
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
    Timer: {
      path: '/timer',
      screen: TimerStack,
    },
    Base: {
      path: '/path',
      screen: KnowledgeBaseStack,
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

DrawerNavigator.navigationOptions = {
  header: null,
};
