const toggleTaskForm = () => {
  const taskForm = document.getElementById('task-form');
  taskForm.classList.toggle('hide');
}


const toggleTaskEvent = () => {
  const showTaskFormBtn = document.getElementById('add-task');
  const closeTaskFormBtn = document.getElementById('close-form');
  showTaskFormBtn.addEventListener('click', toggleTaskForm);
  closeTaskFormBtn.addEventListener('click', toggleTaskForm);
}


export { toggleTaskEvent };




