import { toggleTaskForm } from '../views/taskForm.js';


let taskList, id;
const customList = JSON.parse(localStorage.getItem('userList'));


const getTask = () => {
  const data = localStorage.getItem('toDoList');

  if (data) {
    taskList = JSON.parse(data);
    id = taskList.length;
    loadTaskList(taskList);
  } else {
    taskList = [];
    id = 0
  }
}


const loadTaskList = array => {
  array.forEach(element => addToDo(element));
}


const addToDo = toDo => {
  const allTasksList = document.getElementById('all-tasks-list');
  const importantTaskList = document.getElementById('important-list');
  const completedTaskList = document.getElementById('completed-list');

  const STAR = 'fas'
  const UNSTAR = 'far'
  const CHECK = 'fa-check-circle';
  const UNCHECK = 'fa-circle';
  const LINE_THROUGH = 'line-through';
  const RED = 'red';

  const IMPORTANT = toDo.isImportant ? STAR : UNSTAR;
  const RED_LINE = toDo.isImportant ? RED : '';
  const DONE = toDo.isDone ? CHECK : UNCHECK;
  const LINE = toDo.isDone ? LINE_THROUGH : '';

  const item =
    `
      <li class="main__item">
        <button class="main__done">
          <i class="far ${DONE} green" id="${toDo.id}"></i>
        </button>
        <div class="main__content">
          <h4 class="${RED_LINE}">${toDo.title}</h4>
          <p class="${LINE} ${RED_LINE}">${toDo.description}</p>
        </div>
        <button class="main__important">
          <i class="${IMPORTANT} fa-star yellow" id="${toDo.id}"></i>
        </button>
        <button class="main__delete">
          <i class="far fa-trash-alt" id="${toDo.id}"></i>
        </button>
      </li>
    `;

  const position = 'beforeend';

  toDo.isDone ? completedTaskList.insertAdjacentHTML(position, item) :
  allTasksList.insertAdjacentHTML(position, item);

  toDo.isImportant && !toDo.isDone && importantTaskList.insertAdjacentHTML(position, item);

}


const createToDo = e => {
  e.preventDefault();

  let taskTitleInput = document.getElementById('task-title');
  let taskDescriptionInput = document.getElementById('task-description');
  let taskCompleteInput = document.getElementById('is-done');
  let taskImportantInput = document.getElementById('is-important');
  let taskColorSelect = document.getElementById('colors');
  let taskListSelect = document.getElementById('custom-list');

  if (!taskTitleInput.value || !taskDescriptionInput.value) return;

  let toDo = {
    id: id,
    title: taskTitleInput.value,
    description: taskDescriptionInput.value,
    isImportant: taskImportantInput.checked ? true : false,
    isDone: taskCompleteInput.checked ? true : false,
    color: taskColorSelect.options[taskColorSelect.selectedIndex].value !== '0' &&
      taskColorSelect.options[taskColorSelect.selectedIndex].text,
    list: taskListSelect.options[taskListSelect.selectedIndex].text !== 'Choose List' &&
      taskListSelect.options[taskListSelect.selectedIndex].text,
  }

  addToDo(toDo);

  taskList.push(toDo);
  // UPDATE THE LOCAL STORAGE
  localStorage.setItem('toDoList', JSON.stringify(taskList));
  // increment the id
  id++;
  // clear the input box
  taskTitleInput.value = '';
  taskDescriptionInput.value = '';
  taskCompleteInput.checked = false;
  taskImportantInput.checked = false;
  taskColorSelect.value = '0';
  taskListSelect.value = '0';

  toggleTaskForm();

  if ( customList && customList.length > 0) {
    const targetList = customList.find(list => list.title == toDo.list);
    targetList.tasks.push(toDo);
    localStorage.setItem('userList', JSON.stringify(customList));
  }
  
}


const setTaskToDone = e => {
  const targetElement = taskList.find( toDo => toDo.id == e.target.id);
  targetElement.isDone = targetElement.isDone ? false : true;
  localStorage.setItem('toDoList', JSON.stringify(taskList));

  customList.forEach(list => {
    const taskCustomLIst = list.tasks;
    const targetCustomElement = taskCustomLIst.find(task => task.id);
    targetCustomElement.isDone = targetCustomElement.isDone ? false : true;
    localStorage.setItem('userList', JSON.stringify(customList));
  });

  location.reload();
}


const setTaskToImportant = e => {
  const targetElement = taskList.find( toDo => toDo.id == e.target.id);
  targetElement.isImportant = targetElement.isImportant ? false : true;
  localStorage.setItem('toDoList', JSON.stringify(taskList));

  customList.forEach(list => {
    const taskCustomLIst = list.tasks;
    const targetCustomElement = taskCustomLIst.find(task => task.id);
    targetCustomElement.isImportant = targetCustomElement.isImportant ? false : true;
    localStorage.setItem('userList', JSON.stringify(customList));
  });

  location.reload();
}


const deleteTask = e => {
  // Remove HTML element
  e.path[2].remove();
  // Find Item
  const targetElement = taskList.find( toDo => toDo.id === e.target.id);
  // Remove item
  taskList.splice(targetElement, 1);
  // Update Local Storage
  localStorage.setItem('toDoList', JSON.stringify(taskList));
}


export { getTask, createToDo, setTaskToDone, setTaskToImportant, deleteTask };