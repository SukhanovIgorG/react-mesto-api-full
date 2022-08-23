class Api {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers;
  }

    _getAuthHeader() {
    const jwt = localStorage.getItem('JWT');
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`чек респонс Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then(this._checkResponse);
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then(this._checkResponse);
  }

  postUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  postUserAvatar(avatar_link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify({
        avatar: avatar_link,
      }),
    }).then(this._checkResponse);
  }

  postNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  trashCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: "DELETE",
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then(this._checkResponse);
  }

  addLike(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: "PUT",
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then(this._checkResponse);
  }

  removeLike(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: "DELETE",
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then(this._checkResponse);
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: "https://sukhanovgarik.back.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
