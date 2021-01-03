const getDate = () => {
  const dateElement = document.getElementById('date');

  const today = new Date();
  const options = { day: 'numeric', weekday: 'long',  month: 'long'};

  dateElement.innerText = today.toLocaleDateString('en-US', options);
}


export { getDate };