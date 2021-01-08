// DOM REFERENCE
const listContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListBtn = document.querySelector('[data-delete-list-btn]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const deleteCompleteTaskBtn = document.querySelector('[data-delete-complete-tasks-btn]');
const dateElement = document.querySelector('[data-date]');
const deleteContainer = document.querySelector('[data-delete-stuff]');
const searchTaskForm = document.querySelector('[data-search-task-form]');
const searchTaskInput = document.querySelector('[data-search-task-input]');
// VARIABLES
let defaultList = [
  {id: 'all', name:'all tasks', icon: 'fas fa-home blue', tasks: [], },
  {id: 'important', name:'important', icon: 'fas fa-star yellow', tasks: []},
  {id: 'complete', name:'complete', icon: 'fas fa-check-circle green', tasks: []},
];
let lists = JSON.parse(localStorage.getItem('taskList')) || defaultList;
let selectedListId = JSON.parse(localStorage.getItem('selectedList'));

// EVENT LISTENER
listContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
})

tasksContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'i') {

    const selectedList = lists.find(list => list.id === selectedListId);
    const allTaskList = lists.find(list => list.id === 'all');
    const completedList = lists.find(list => list.id === 'complete');
    const importantList = lists.find(list => list.id === 'important');
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);

    if (e.target.className.includes('green')) {
      if (!selectedTask.complete) {
        selectedTask.complete = true;
        completedList.tasks.push(selectedTask);
        filterTaskList(allTaskList, selectedTask);
        filterTaskList(importantList, selectedTask);
      } else {
        selectedTask.complete = false;
        filterTaskList(completedList, selectedTask);
        allTaskList.tasks.push(selectedTask);

        selectedTask.important && importantList.tasks.push(selectedTask);
      }
      setTaskToComplete(e);

    } else if (e.target.className.includes('yellow')) {
      if (!selectedTask.important) {
        selectedTask.important = true;
        importantList.tasks.push(selectedTask);
      } else {
        selectedTask.important = false;
        filterTaskList(importantList, selectedTask);
      }
      setTaskToImportant(e);

    } else {
      filterTaskList(selectedList, selectedTask);
      filterTaskList(allTaskList, selectedTask);
      filterTaskList(importantList, selectedTask);
      filterTaskList(completedList, selectedTask);
    }

    saveAndRender();
    renderTaskCount(selectedList);
  }
})

deleteCompleteTaskBtn.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
  saveAndRender();
})

deleteListBtn.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = 'all';
  saveAndRender();
})

newListForm.addEventListener('submit', e => {
  e.preventDefault();

  const listName = newListInput.value;
  if (!listName) return;
  const list = createList(listName);
  newListInput.value = '';
  lists.push(list);

  saveAndRender();
})

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  const taskName = newTaskInput.value;
  if (!taskName) return;
  const task = createTask(taskName);
  newTaskInput.value = '';

  const selectedList  = lists.find(list => list.id === selectedListId);
  const allTaskList = lists.find(list => list.id === 'all');

  selectedList.tasks.push(task);
  selectedList != allTaskList && allTaskList.tasks.push(task);

  saveAndRender();
})

searchTaskForm.addEventListener('submit', e => {
  e.preventDefault();

  const searchName = searchTaskInput.value;
  if (!searchName) return;
  const search = searchTask(searchName);
  renderFoundedTask(search);

  setTimeout(()=> {
    searchTaskInput.value = '';
  },3000)

})

// FUNCTIONS
function filterTaskList(list, target) {
  return list.tasks = list.tasks.filter(list => list.id !== target.id);
}
function createList(name) {
  return { id: Date.now().toString(), name:name, icon:'fas fa-list-ul', tasks:[] };
}

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false, important: false};
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem('taskList', JSON.stringify(lists));
  localStorage.setItem('selectedList', JSON.stringify(selectedListId));
}

function render() {
  clearElement(listContainer);
  renderLists();

  const selectedList = lists.find(list => list.id === selectedListId);
  const option = {
    all: 'all',
    important: 'important',
    complete: 'complete'
  }

  if (!selectedListId) selectedListId = option.all;

  if ( selectedListId === option.all) {
    addHideClass(deleteContainer);
    removeHideClass(newTaskForm);
    removeHideClass(listCountElement);

  } else if (selectedListId === option.important) {
    addHideClass(deleteContainer);
    addHideClass(newTaskForm);
    removeHideClass(listCountElement);
  }

  else if (selectedListId === option.complete) {
    addHideClass(deleteContainer);
    addHideClass(newTaskForm);
    addHideClass(listCountElement);

    if (selectedList.tasks.length > 0) {
      removeHideClass(deleteContainer);
      addHideClass(deleteListBtn);
    }

  } else {
    removeHideClass(deleteContainer);
    removeHideClass(deleteListBtn);
    removeHideClass(newTaskForm);
    removeHideClass(listCountElement);
  }

  listTitleElement.innerText = selectedList.name;
  clearElement(tasksContainer);
  renderTasks(selectedList);
  renderTaskCount(selectedList);
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
  const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks';
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderFoundedTask(list) {
  tasksContainer.innerText = '';
  listCountElement.innerText = '';
  listTitleElement.innerText = 'Tasks Found:';
  deleteContainer.classList.add('hide');

  list.length > 0 ? list.forEach(task => renderTask(task)) :
    listTitleElement.innerText = 'No tasks was found! 🚫 ';
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => renderTask(task));
}

function renderTask(task) {
  const STAR = 'fas'
  const UNSTAR = 'far'
  const CHECK = 'fa-check-circle';
  const UNCHECK = 'fa-circle';
  const LINE_THROUGH = 'line-through';
  const RED = 'red';

  const IMPORTANT = task.important ? STAR : UNSTAR;
  const RED_LINE = task.important && RED;
  const DONE = task.complete ? CHECK : UNCHECK;
  const LINE = task.complete && LINE_THROUGH;

  const taskElement = document.importNode(taskTemplate.content, true);
  const complete = taskElement.querySelector('[data-complete]');
  complete.id = task.id;
  complete.className = `far ${DONE} green`;
  const title = taskElement.querySelector('p');
  title.className = `${RED_LINE} ${LINE}`;
  title.innerText = task.name;
  const important = taskElement.querySelector('[data-important]');
  important.id = task.id;
  important.className = `${IMPORTANT} fa-star yellow`;
  const deleteTask = taskElement.querySelector('[data-delete-task]');
  deleteTask.id = task.id;
  tasksContainer.insertBefore(taskElement, tasksContainer.firstChild);
}

function renderLists() {
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList = 'sidebar__list';
    listElement.innerHTML = `<i class="${list.icon}"></i>${list.name}`;
    if (list.id === selectedListId) {
      listElement.classList.add('active');
    }
    listContainer.appendChild(listElement);
  })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function setDate() {
  const date = new Date();
  const options = {day: 'numeric', weekday: 'long', month: 'long'};
  dateElement.innerText = date.toLocaleDateString('en-US', options);
}

function setTaskToComplete(e) {
  const CHECK = 'fa-check-circle';
  const UNCHECK = 'fa-circle';
  const LINE_THROUGH = 'line-through';
  e.target.classList.toggle(CHECK);
  e.target.classList.toggle(UNCHECK);
  e.path[1].children[1].children[0].classList.toggle(LINE_THROUGH);
}

function setTaskToImportant(e) {
  const STAR = 'fas';
  const UNSTAR = 'far';
  const RED = 'red';
  e.target.classList.toggle(STAR);
  e.target.classList.toggle(UNSTAR);
  e.path[1].children[1].children[0].classList.toggle(RED);
}

function searchTask(name) {
  const allTaskList = lists.find(list => list.id === 'all');
  return allTaskList.tasks.filter(task => task.name.includes(name));
}

function addHideClass(element) {
  return element.classList.add('hide');
}

function removeHideClass(element) {
  return element.classList.remove('hide');
}


render();
setDate();