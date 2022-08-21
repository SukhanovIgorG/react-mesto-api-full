// export const BASE_URL = "https://auth.nomoreparties.co";
export const BASE_URL = "https://sukhanovgarik.back.nomoredomains.sbs";
// export const BASE_URL = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`чек респонс Ошибка ${res.status}`);
};


export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      console.log('second then in register')
      return res;
    });
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      localStorage.setItem("JWT", res.token);
      return res;
    });
};

// проверка мейла
export const me = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    });
};

export const card = () => {
  return fetch(`${BASE_URL}/cards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    });
};
