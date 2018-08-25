export const ADD_TASK = 'toDoList/newTask';
export const UPDATE_TASK_CHECK = 'toDoList/updateTaskCheck';
export const ADD_CATEGORY = 'skills/addCategory';
export const ADD_SKILL = 'skills/addSkill';

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
    default:
      return state;
  }
}

export function addTask(task) {
  return {
    type: ADD_TASK,
    payload: {
      newTask: task,
    },
  };
}

export function updateTaskCheck(taskID) {
  return {
    type: UPDATE_TASK_CHECK,
    payload: {
      taskID,
    },
  };
}

export function addCategory(title) {
  return {
    type: ADD_CATEGORY,
    payload: {
      title,
    },
  };
}

export function addSkill(skillName, categoryID) {
  console.log('add skill');
  console.log('add skill ', skillName);
  console.log('add skill ', categoryID);
  return {
    type: ADD_SKILL,
    payload: {
      skillName,
      categoryID,
    },
  };
}
