/* eslint-disable import/extensions */
const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRoutes = express.Router();
const userControllers = require('../controller/userControllers.js');

userRoutes.get('/', userControllers.getUsers);
userRoutes.get('/me', userControllers.getUserInfo);
userRoutes.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), userControllers.getUserById);
userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), userControllers.updateUserInfo);
userRoutes.patch('/me/avatar/', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/),
  }),
}), userControllers.updateUserAvatar);

module.exports = {
  userRoutes,
};
