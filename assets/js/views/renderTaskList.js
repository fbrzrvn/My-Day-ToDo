const renderTaskList = e => {
  const taskListLIst = document.querySelectorAll('[data-list]');
  taskListLIst.forEach(list => {
    if (list.id.startsWith(e.target.id)) {
      list.classList.remove('hide');
    } else {
      list.classList.add('hide');
    }
  })
}


const handleRenderTaskList = () => {
  const taskListLink = document.querySelectorAll('[data-link]');
  taskListLink.forEach(link => link.addEventListener('click', renderTaskList));
}


export { handleRenderTaskList };