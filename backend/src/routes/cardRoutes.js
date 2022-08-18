/* eslint-disable import/extensions */
const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardRoutes = express.Router();
const cardControllers = require('../controller/cardControllers.js');

cardRoutes.get('/', cardControllers.getCards);

cardRoutes.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), cardControllers.deleteCardById);

cardRoutes.post('/', celebrate({
  // валидируем параметры
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/),
  }),
}), cardControllers.createCard);

cardRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), cardControllers.likeCard);

cardRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), cardControllers.dislikeCard);

module.exports = {
  cardRoutes,
};
