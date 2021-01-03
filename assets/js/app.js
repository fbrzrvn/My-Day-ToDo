import { getDate } from './date.js';
import { toggleTaskEvent } from './taskForm.js';
import { toggleListEvent } from './listForm.js';
import { handleEvent, onLoad } from './renderTaskList.js';


getDate();
toggleTaskEvent();
toggleListEvent();
handleEvent();
onLoad();