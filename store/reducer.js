import moment from 'moment';
export const ADD_TASK = 'toDoList/newTask';
export const UPDATE_TASK_CHECK = 'toDoList/updateTaskCheck';
export const ADD_CATEGORY = 'skills/addCategory';
export const ADD_SKILL = 'skills/addSkill';
export const DELETE_SKILL = 'skills/deleteSkill';
export const DELETE_CATEGORY = 'skills/deleteCategory';
export const ADD_TIMER_RECORD = 'timer/addTimerRecord';
export const DELETE_TIMER_RECORD = 'timer/deleteTimerRecord';
export const ADD_NOTE = 'knowlegdeBase/addNote';
export const DELETE_NOTE = 'knowlegdeBase/deleteNote';
export const GET_STORAGE_DATA = 'GET_STORAGE_DATA';

import { AsyncStorage } from 'react-native';

const initialState = {
  toDoTasks: [
    {
      id: 0,
      content: 'Umówić wizytę u dentysty',
      date: '2018-08-29 12:00',
      done: false,
    },
    {
      id: 1,
      content: 'Odebrać bratanicę z przedszkola',
      date: '2018-08-27 15:20',
      done: false,
    },
    {
      id: 2,
      content: 'Skończyć projekt',
      date: '2018-08-30 20:00',
      done: false,
    },
  ],
  skillsCategories: [
    {
      id: 0,
      title: 'Sport',
      skills: ['Bieganie', 'Pływanie'],
    },
    {
      id: 1,
      title: 'Języki programownia',
      skills: ['Ruby', 'JavaScript'],
    },
    {
      id: 2,
      title: 'Języki obce',
      skills: ['Angielski', 'Hiszpański'],
    },
  ],
  timerRecords: [
    {
      id: 0,
      categoryName: 'Sport',
      skillName: 'Biegi długodystansowe',
      startTime: '14:07: 00',
      duration: '01:04:00',
      endTime: '15:11:00',
    },
  ],
  // categoryNotes: [
  //   {
  //     id: 0,
  //     categoryName: 'Sport',
  //     notes: [
  //       {
  //         id: 0,
  //         title: 'Dobra rozgrzewka',
  //         contentType: 'text',
  //         content:
  //           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  //       },
  //     ],
  //   },
  // ],
  notes: [
    {
      id: 0,
      categoryID: 0,
      title: 'Dobra rozgrzewka',
      contentType: 'text',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
  ],
};

function updateStorage(state) {
  AsyncStorage.setItem('@toDoTasks', JSON.stringify(state.toDoTasks));
  AsyncStorage.setItem('@skillsCategories', JSON.stringify(state.skillsCategories));
  AsyncStorage.setItem('@timerRecords', JSON.stringify(state.timerRecords));
  AsyncStorage.setItem('@notes', JSON.stringify(state.notes));
}

export default function reducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_STORAGE_DATA:
      return {
        ...state,
        ...action.payload.data,
      };
    case ADD_TASK:
      newState = {
        ...state,
        toDoTasks: [...state.toDoTasks, { ...action.payload.newTask, id: state.toDoTasks.length }],
      };
      updateStorage(newState);
      return newState;
    case UPDATE_TASK_CHECK:
      newState = {
        ...state,
        toDoTasks: state.toDoTasks.map(
          task => (task.id === action.payload.taskID ? { ...task, done: !task.done } : task)
        ),
      };
      updateStorage(newState);
      return newState;
    case ADD_CATEGORY:
      newState = {
        ...state,
        skillsCategories: [
          ...state.skillsCategories,
          { id: state.skillsCategories.length, title: action.payload.title, skills: [] },
        ],
      };
      updateStorage(newState);
      return newState;
    case ADD_SKILL:
      newState = {
        ...state,
        skillsCategories: state.skillsCategories.map(
          category =>
            category.id === action.payload.categoryID
              ? { ...category, skills: [...category.skills, action.payload.skillName] }
              : category
        ),
      };
      updateStorage(newState);
      return newState;
    case DELETE_SKILL:
      newState = {
        ...state,
        skillsCategories: state.skillsCategories.map(
          category =>
            category.id === action.payload.categoryID
              ? { ...category, skills: category.skills.filter((skill, index) => index !== action.payload.skillIndex) }
              : category
        ),
      };
      updateStorage(newState);
      return newState;
    case DELETE_CATEGORY:
      newState = {
        ...state,
        skillsCategories: state.skillsCategories.filter(category => category.id !== action.payload.categoryID),
      };
      updateStorage(newState);
      return newState;
    case ADD_TIMER_RECORD:
      newState = {
        ...state,
        timerRecords: [
          ...state.timerRecords,
          {
            id: state.timerRecords.length,
            categoryName: action.payload.categoryName,
            skillName: action.payload.skillName,
            startTime: action.payload.startTime,
            duration: action.payload.formattedDuration,
            endTime: moment(action.payload.startTime, 'HH:mm:ss')
              .add(action.payload.duration, 'seconds')
              .format('HH:mm:ss'),
          },
        ],
      };
      updateStorage(newState);
      return newState;
    case DELETE_TIMER_RECORD:
      newState = {
        ...state,
        timerRecords: state.timerRecords.filter(record => record.id !== action.payload.recordID),
      };
      updateStorage(newState);
      return newState;
    case ADD_NOTE:
      newState = {
        ...state,
        notes: [
          ...state.notes,
          {
            id: state.notes.length,
            categoryID: action.payload.categoryID,
            title: action.payload.noteTitle,
            contentType: action.payload.noteType,
            content: action.payload.noteContent,
          },
        ],
      };
      updateStorage(newState);
      return newState;
    case DELETE_NOTE:
      newState = {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.noteID),
      };
      updateStorage(newState);
      return newState;
    default:
      return state;
  }
}
