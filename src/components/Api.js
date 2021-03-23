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
      });
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', this._options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
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
      });
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  putLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  patchAvatar(url) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({ avatar: url })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

}

