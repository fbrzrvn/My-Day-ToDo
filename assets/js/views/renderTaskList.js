const renderTaskList = e => {
  const taskListLIst = document.querySelectorAll('[data-list]');
  taskListLIst.forEach(list => {

    if (list.id.startsWith(e.target.id)) {
      list.classList.remove('hide');
    } else {
      list.classList.add('hide');
    }

    hideCustomList();
  })
}


const handleRenderTaskList = () => {
  const taskListLink = document.querySelectorAll('[data-link]');
  taskListLink.forEach(link => link.addEventListener('click', renderTaskList));
}


const showCustomList = () => {
  const customListLink = document.querySelectorAll('[data-custom-link]');
  const customList = Array.from(document.querySelectorAll('[data-custom-list]'));
  const defaultList = document.querySelectorAll('[data-list]');

  customListLink.forEach(link => {
    link.addEventListener('click', e => {
      let selectedListId;

      if (e.target.tagName.toLowerCase() == 'li') {
        selectedListId = e.target.id;
      }

      customList.find(list => list.id == selectedListId ?
        list.classList.remove('hide') : list.classList.add('hide'));

      defaultList.forEach(list => list.classList.add('hide'));

    })
  })
}


const hideCustomList = () => {
  const customList = document.querySelectorAll('[data-custom-list]');
  customList.forEach(list => list.classList.add('hide'));
}


export { handleRenderTaskList, showCustomList };