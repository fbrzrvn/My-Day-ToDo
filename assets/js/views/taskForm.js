const toggleTaskForm = () => {
  const customList = JSON.parse(localStorage.getItem("userList"));
  const customListOption = document.getElementById('custom-list');
  const taskForm = document.getElementById('task-form');

  taskForm.classList.toggle('hide');

  if (!customList) return;

  customList.map(list => {
    const item = `<option value="${list.id}">${list.title.toLowerCase()}</option>`;
    customListOption.insertAdjacentHTML('beforeend', item);
  })
}


const toggleTaskEvent = () => {
  const showTaskFormBtn = document.getElementById('add-task');
  const closeTaskFormBtn = document.getElementById('close-form');

  showTaskFormBtn.addEventListener('click', toggleTaskForm);
  closeTaskFormBtn.addEventListener('click', toggleTaskForm);
}


export { toggleTaskEvent, toggleTaskForm };




