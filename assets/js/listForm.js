const toggleListForm = e => {
  const listForm = document.getElementById('create-list-form');
  e.target.classList.toggle('active');
  setTimeout( () => listForm.classList.toggle('hide'), 150);
}


const toggleListEvent = () => {
  const showListFormBtn = document.getElementById('add-list');
  showListFormBtn.addEventListener('click', toggleListForm);
}


export { toggleListEvent };