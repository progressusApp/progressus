import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import { getDataFromStorage } from './store/actions';
import { toDoTasks, skillsCategories, timerRecords, notes } from './mockupData.js';
import randomWords from 'random-words';
import { DrawerNavigator } from './navigation/MainDrawerNavigation';

const store = createStore(reducer);

export default class App extends React.Component {
  //generator danych wykorzystywanych przy testowaniu aplikacji

  // generateData = () => {
  //   let data = [];
  //   for (let i = 0; i < 2000; i++) {
  //     const title = randomWords(2).join(' ');
  //
  //     const content = randomWords(20).join(' ');
  //     data.push({ id: i, categoryID: 0, title: title, contentType: 'text', content: content });
  //   }
  //   return data;
  // };

  saveMockupDataInStorage = () => {
    AsyncStorage.setItem('@toDoTasks', JSON.stringify(toDoTasks));
    AsyncStorage.setItem('@skillsCategories', JSON.stringify(skillsCategories));
    AsyncStorage.setItem('@timerRecords', JSON.stringify(timerRecords));
    AsyncStorage.setItem('@notes', JSON.stringify(notes));
  };

  componentWillMount() {
    let sampleData = {};

    AsyncStorage.getItem('@toDoTasks').then(tasks => {
      sampleData = JSON.parse(tasks);
      if (!sampleData) {
        this.saveMockupDataInStorage();
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
          const skills = JSON.parse(response[1]);
          const records = JSON.parse(response[2]);
          const notes = JSON.parse(response[3]);
          store.dispatch(
            getDataFromStorage({
              toDoTasks: tasks,
              skillsCategories: skills,
              timerRecords: records,
              notes: notes,
            })
          );
        });
      }
    });
  }

  saveCurrentAppState = state => {
    AsyncStorage.setItem('@toDoTasks', JSON.stringify(state.toDoTasks));
    AsyncStorage.setItem('@skillsCategories', JSON.stringify(state.skillsCategories));
    AsyncStorage.setItem('@timerRecords', JSON.stringify(state.timerRecords));
    AsyncStorage.setItem('@notes', JSON.stringify(state.notes));
  };

  componentWillUnmount() {
    const state = store.getState();
    this.saveCurrentAppState(state);
  }

  render() {
    return (
      <Provider store={store}>
        <DrawerNavigator />
      </Provider>
    );
  }
}
