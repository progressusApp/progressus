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
export const SET_DATA_STORAGE = 'SET_DATA_STORAGE';

export function getDataFromStorage(data) {
  console.log('getDataFromStorage ', data);
  return {
    type: GET_STORAGE_DATA,
    payload: {
      data: data,
    },
  };
}

export function setDataStorage(data) {
  return {
    type: SET_DATA_STORAGE,
  };
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

export function deleteCategory(categoryID) {
  return {
    type: DELETE_CATEGORY,
    payload: {
      categoryID,
    },
  };
}

export function addSkill(skillName, categoryID) {
  return {
    type: ADD_SKILL,
    payload: {
      skillName,
      categoryID,
    },
  };
}

export function deleteSkill(categoryID, skillIndex) {
  return {
    type: DELETE_SKILL,
    payload: {
      categoryID,
      skillIndex,
    },
  };
}

export function addTimerRecord(categoryName, skillName, duration, startTime, formattedDuration) {
  return {
    type: ADD_TIMER_RECORD,
    payload: {
      categoryName,
      skillName,
      duration,
      startTime,
      formattedDuration,
    },
  };
}

export function deleteTimerRecord(recordID) {
  return {
    type: DELETE_TIMER_RECORD,
    payload: {
      recordID,
    },
  };
}

export function addNote(categoryID, noteTitle, noteType, noteContent) {
  return {
    type: ADD_NOTE,
    payload: {
      categoryID,
      noteTitle,
      noteType,
      noteContent,
    },
  };
}

export function deleteNote(noteID) {
  return {
    type: DELETE_NOTE,
    payload: {
      noteID,
    },
  };
}
