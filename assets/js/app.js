import { getDate } from './model/date.js';
import { toggleTaskEvent } from './views/taskForm.js';
import { toggleListEvent } from './views/listForm.js';
import { handleRenderTaskList } from './views/renderTaskList.js';
import { createToDo, getTask } from './controller/task.js';
import { applyStyle } from './views/task.js';


const createTaskBtn = document.getElementById('create-task-btn');


window.addEventListener('DOMContentLoaded', () => {
  getDate();
  toggleTaskEvent();
  toggleListEvent();
  handleRenderTaskList();
  getTask();
  applyStyle();
})
createTaskBtn.addEventListener('click', createToDo);



