export const ADD_TASK = 'toDoList/newTask';
export const UPDATE_TASK_CHECK = 'toDoList/updateTaskCheck';

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
