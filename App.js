import React from 'react';
import { Button, Text, View, AsyncStorage } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import { getDataFromStorage, setDataStorage } from './store/actions';
import MainViewStack from './MainView';
import ToDoListStack from './screens/toDoList/ToDoList';
import SkillsStack from './screens/Skills';
import TimerStack from './screens/Timer';
import KnowledgeBaseStack from './screens/knowledgeBase/KnowledgeBase';
import { toDoTasks, skillsCategories, timerRecords, notes } from './mockupData.js';
import { data } from './dataGenerator';
import randomWords from 'random-words';

const store = createStore(reducer);

console.disableYellowBox = true;

export default class App extends React.Component {
  generateData = () => {
    let data = [];
    for (let i = 0; i < 100; i++) {
      const title = randomWords(2).join(' ');
      const content = randomWords(20).join(' ');
      data.push({ id: i, categoryID: 0, title: title, contentType: 'text', content: content });
    }
    return data;
  };
  componentWillMount() {
    let sampleData = {};
    console.log('data from generator ');

    // AsyncStorage.clear();
    AsyncStorage.getItem('@toDoTasks').then(tasks => {
      sampleData = JSON.parse(tasks);
      if (!sampleData) {
        AsyncStorage.setItem('@toDoTasks', JSON.stringify(toDoTasks));
        AsyncStorage.setItem('@skillsCategories', JSON.stringify(skillsCategories));
        AsyncStorage.setItem('@timerRecords', JSON.stringify(timerRecords));
        AsyncStorage.setItem('@notes', JSON.stringify(notes));
        store.dispatch(getDataFromStorage({ toDoTasks, skillsCategories, timerRecords, notes }));
      } else {
        let promises = [];
        AsyncStorage.getItem('@toDoTasks').then(tasks => console.log('seriously I found dataaaa ', tasks));
        promises.push(AsyncStorage.getItem('@toDoTasks'));
        promises.push(AsyncStorage.getItem('@skillsCategories'));
        promises.push(AsyncStorage.getItem('@timerRecords'));
        promises.push(AsyncStorage.getItem('@notes'));
        Promise.all(promises).then(response => {
          const tasks = JSON.parse(response[0]);
          console.log('tasks ', tasks);
          const skills = JSON.parse(response[1]);
          const records = JSON.parse(response[2]);
          const notesStorage = this.generateData();
          console.log('notesStorage ', notesStorage);
          store.dispatch(
            getDataFromStorage({
              toDoTasks: tasks,
              skillsCategories: skills,
              timerRecords: records,
              notes: notesStorage,
            })
          );
        });
      }
    });
  }

  componentWillUnmount() {
    const storage = store.getState();
    AsyncStorage.setItem('@toDoTasks', JSON.stringify(storage.toDoTasks));
    AsyncStorage.setItem('@skillsCategories', JSON.stringify(storage.skillsCategories));
    AsyncStorage.setItem('@timerRecords', JSON.stringify(storage.timerRecords));
    AsyncStorage.setItem('@notes', JSON.stringify(storage.notes));
  }

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

DrawerExample.navigationOptions = {
  header: null,
};
