const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const xhr = new XMLHttpRequest();

  xhr.withCredentials = true;

  const url = 'https://help-desk-backend-2021.herokuapp.com/?method=createTicket';

  xhr.open('POST', url);

  xhr.send(formData);

  xhr.onloadend = function() {
    if (String(xhr.status).startsWith('2')) {
      console.log("Успех");
    } else {
      let content = 'Сервер не принял запрос. ';
      content += `Ошибка ${xhr.status}: ${xhr.statusText}.`;
      console.error(content);
    }
  };
})
