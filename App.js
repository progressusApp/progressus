import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import { getDataFromStorage } from './store/actions';
import { toDoTasks, skillsCategories, timerRecords, notes } from './mockupData.js';
// import { data } from './dataGenerator';
import randomWords from 'random-words';
import { DrawerNavigator } from './navigation/MainDrawerNavigation';

const store = createStore(reducer);

console.disableYellowBox = true;

export default class App extends React.Component {
  generateData = () => {
    let data = [];
    for (let i = 0; i < 2000; i++) {
      const title = randomWords(2).join(' ');

      const content = randomWords(20).join(' ');
      data.push({ id: i, categoryID: 0, title: title, contentType: 'text', content: content });
    }
    return data;
  };
  componentWillMount() {
    let sampleData = {};

    // console.log('start');
    // AsyncStorage.setItem('@toDoTasks', JSON.stringify(toDoTasks));
    // AsyncStorage.setItem('@skillsCategories', JSON.stringify(skillsCategories));
    // AsyncStorage.setItem('@timerRecords', JSON.stringify(timerRecords));
    // AsyncStorage.setItem('@notes', JSON.stringify(notes));
    // store.dispatch(getDataFromStorage({ toDoTasks, skillsCategories, timerRecords, notes }));
    // console.log('stop');

    AsyncStorage.clear();
    AsyncStorage.getItem('@toDoTasks').then(tasks => {
      sampleData = JSON.parse(tasks);
      console.log('cokolwiek');
      if (!sampleData) {
        console.log('!sampleData ');

        AsyncStorage.setItem('@toDoTasks', JSON.stringify(toDoTasks));
        AsyncStorage.setItem('@skillsCategories', JSON.stringify(skillsCategories));
        AsyncStorage.setItem('@timerRecords', JSON.stringify(timerRecords));
        AsyncStorage.setItem('@notes', JSON.stringify(notes));
        store.dispatch(getDataFromStorage({ toDoTasks, skillsCategories, timerRecords, notes }));
      } else {
        let promises = [];
        console.log('I found some data');
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
    console.log('store ', store.getState());
    return (
      <Provider store={store}>
        <DrawerNavigator />
      </Provider>
    );
  }
}
