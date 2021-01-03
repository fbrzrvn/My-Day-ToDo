const onLoad = () => {
  const taskBoard = document.getElementById('tasklist-container');

  taskBoard.innerHTML =
    `
      <div id="tasks" class="main__body" data-default-list>
        <h1>tasks</h1>
        <ul id="tasks-list" class="main__list"></ul>
      </div>
    `;
}



const renderList = e => {
  const taskBoard = document.getElementById('tasklist-container');
  const listName = e.target.innerText.toLowerCase();
  taskBoard.innerHTML =
    `
      <div id="${listName}" class="main__body" data-default-list>
        <h1>${listName}</h1>
        <ul id="${listName}-list" class="main__list"></ul>
      </div>
    `;
}


const handleEvent = () => {
  const link = document.querySelectorAll('[data-link]');
  link.forEach(list => list.addEventListener('click', renderList));
}


export { handleEvent, onLoad };