let customList, id;


const getList = () => {
  const data = localStorage.getItem('userList');

  if (data) {
    customList = JSON.parse(data);
    // set the id to the last one in the list
    id = customList.length;
    loadCustomList(customList);
  } else {
    customList = [];
    id = 0;
  }
}


const loadCustomList = array => {
  array.forEach(list => addList(list));
}


const addList = list => {
  addListLink(list);
  addListContainer(list);
}


const addListLink = list => {
  const sidebarList = document.getElementById('sidebar-list');

  const linkItem =
    `
      <li class="sidebar__link id="${list.title}" data-link>
          <i class="fas fa-list"></i>
          ${list.title}
      </li>
    `;

  const position = 'beforeend';
  sidebarList.insertAdjacentHTML(position, linkItem);

}


const addListContainer = list => {
  const taskListContainer = document.getElementById('tasklist-container');
  const listItem =
    `
      <div id="${list.title}" class="main__body hide" data-list>
        <h1>${list.title}</h1>
        <ul id="${list.title}-list" class="main__list"></ul>
      </div>
    `;

  const position = 'beforeend';
  taskListContainer.insertAdjacentHTML(position, listItem);

  renderCustomTaskList(list);
}


const createList = e => {
  e.preventDefault();
  const listTitleInput = document.getElementById('list-title');
  const createListForm = document.getElementById('create-list-form');
  const listName = listTitleInput.value;

  if (!listName) return;

  let list = {
    id: id,
    title: listName,
    tasks: []
  }

  addList(list);

  customList.push(list);
  // UPDATE THE LOCAL STORAGE
  localStorage.setItem('userList', JSON.stringify(customList));
  // increment the id
  id++;
  // clear the input box
  listTitleInput.value = '';

  createListForm.classList.toggle('hide');

}


const renderCustomTaskList = list => {
  const customTaskListContainer = document.getElementById(`${list.title}-list`);

  customList.forEach(list => {
    if (list.tasks.length > 0) {
      list.tasks.forEach(toDo => {

        const STAR = 'fas'
        const UNSTAR = 'far'
        const CHECK = 'fa-check-circle';
        const UNCHECK = 'fa-circle';
        const LINE_THROUGH = 'line-through';
        const RED = 'red';

        const IMPORTANT = toDo.isImportant ? STAR : UNSTAR;
        const RED_LINE = toDo.isImportant && RED;
        const DONE = toDo.isDone ? CHECK : UNCHECK;
        const LINE = toDo.isDone && LINE_THROUGH;

        const item =
          `
            <li class="main__item">
              <button class="main__done">
                <i class="far ${DONE} green"  id="${toDo.id}"></i>
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
        customTaskListContainer.insertAdjacentHTML(position, item);
      })
    }
  })
}


export { createList, getList };