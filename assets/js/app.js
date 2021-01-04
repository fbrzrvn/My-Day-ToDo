import { getDate } from './model/date.js';
import { toggleTaskEvent } from './views/taskForm.js';
import { toggleListEvent } from './views/listForm.js';
import { handleRenderTaskList } from './views/renderTaskList.js';


window.addEventListener('DOMContentLoaded', () => {
  getDate();
  toggleTaskEvent();
  toggleListEvent();
  handleRenderTaskList();
})




