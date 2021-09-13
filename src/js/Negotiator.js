export default class Negotiator {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  createRequest(options) {
    if (!options) {
      throw new Error('Параметр options функции createRequest не задан');
    }

    const { method, data, callback } = options;
    const url = this.baseURL + options.url;

    const xhr = new XMLHttpRequest();

    try {
      xhr.open(method, url);

      xhr.onloadend = () => {
        if (String(xhr.status).startsWith('2')) {
          console.log('Сервер принял и обработал запрос.');
          if (callback) {
            callback(xhr.response);
          }
        } else {
          let content = 'Сервер не принял запрос. ';
          content += `Ошибка ${xhr.status}: ${xhr.statusText}.`;
          console.error(content);
        }
      };

      if (data === undefined) {
        xhr.send();
      } else {
        const params = new URLSearchParams();

        if (Object.prototype.hasOwnProperty.call(data, 'form')) {
          Array.from(data.form)
            .filter(({ name }) => name)
            .forEach(({ name, value }) => params.append(name, value));
        }

        if (Object.prototype.hasOwnProperty.call(data, 'status')) {
          params.append('status', data.status);
        }

        xhr.send(params);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
