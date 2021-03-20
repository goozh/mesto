export default class Api {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', this._options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', this._options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  patchUserInfo({name, about}) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({ name, about })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  postCard({name, link}) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({ name, link })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

}

