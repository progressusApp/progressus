import moment from 'moment';
export const ADD_TASK = 'toDoList/newTask';
export const UPDATE_TASK_CHECK = 'toDoList/updateTaskCheck';
export const ADD_CATEGORY = 'skills/addCategory';
export const ADD_SKILL = 'skills/addSkill';
export const DELETE_SKILL = 'skills/deleteSkill';
export const DELETE_CATEGORY = 'skills/deleteCategory';
export const ADD_TIMER_RECORD = 'timer/addTimerRecord';
export const DELETE_TIMER_RECORD = 'timer/deleteTimerRecord';

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
  categoryNotes: [
    {
      id: 0,
      categoryName: 'Sport',
      notes: [
        {
          id: 0,
          title: 'Dobra rozgrzewka',
          contentType: 'text',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        },
      ],
    },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, toDoTasks: [...state.toDoTasks, { ...action.payload.newTask, id: state.toDoTasks.length }] };
    case UPDATE_TASK_CHECK:
      return {
        ...state,
        toDoTasks: state.toDoTasks.map(
          task => (task.id === action.payload.taskID ? { ...task, done: !task.done } : task)
        ),
      };
    case ADD_CATEGORY:
      return {
        ...state,
        skillsCategories: [...state.skillsCategories, { title: action.payload.title, skills: [] }],
      };
    case ADD_SKILL:
      return {
        ...state,
        skillsCategories: state.skillsCategories.map(
          category =>
            category.id === action.payload.categoryID
              ? { ...category, skills: [...category.skills, action.payload.skillName] }
              : category
        ),
      };
    case DELETE_SKILL:
      return {
        ...state,
        skillsCategories: state.skillsCategories.map(
          category =>
            category.id === action.payload.categoryID
              ? { ...category, skills: category.skills.filter((skill, index) => index !== action.payload.skillIndex) }
              : category
        ),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        skillsCategories: state.skillsCategories.filter(category => category.id !== action.payload.categoryID),
      };

    case ADD_TIMER_RECORD:
      return {
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
    case DELETE_TIMER_RECORD:
      return {
        ...state,
        timerRecords: state.timerRecords.filter(record => record.id !== action.payload.recordID),
      };
    default:
      return state;
  }
}
