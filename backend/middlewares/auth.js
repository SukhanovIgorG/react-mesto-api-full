/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
}; // для варианта с токеном в ответе/запросе

module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('нужна авторизация');
  }
  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret-key');
  } catch (err) {
    next(new AuthError('нужна авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

// const jwt = require('jsonwebtoken');
// const AuthError = require('../errors/auth-error');

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     payload = jwt.verify(token, 'super-strong-secret-key');
//   } catch (err) {
//     next(new AuthError('нужна авторизация'));
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//   next(); // пропускаем запрос дальше
// };
