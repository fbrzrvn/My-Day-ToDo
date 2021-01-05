import { deleteTask, setTaskToDone, setTaskToImportant } from '../controller/task.js';


const applyStyle = () => {
  const taskListElement = document.querySelectorAll('.main__list');
  taskListElement.forEach(element => {
    element.addEventListener('click', e => {

      if (e.target.className.includes('green')) {
        setTaskToDone(e);
        applyCompletedStyle(e);
      } else if (e.target.className.includes('yellow')) {
        setTaskToImportant(e);
        applyImportantStyle(e);
      } else {
        deleteTask(e);
      }
    })
  })
}


const applyCompletedStyle = e => {
  const CHECK = 'fa-check-circle';
  const UNCHECK = 'fa-circle';
  const LINE_THROUGH = 'line-through';
  e.target.classList.toggle(CHECK);
  e.target.classList.toggle(UNCHECK);
  e.path[2].children[1].children[1].classList.toggle(LINE_THROUGH);
}


const applyImportantStyle = e => {
  const STAR = 'fas';
  const UNSTAR = 'far';
  const RED = 'red';
  e.target.classList.toggle(STAR);
  e.target.classList.toggle(UNSTAR);
  e.path[2].children[1].children[0].classList.toggle(RED);
  e.path[2].children[1].children[1].classList.toggle(RED);
}


export { applyStyle };