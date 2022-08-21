/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-expressions */
const { Card } = require('../../models/cardsModels');
const NotFoundError = require('../../errors/not-found-error');
const CastError = require('../../errors/cast-error');
const RulesError = require('../../errors/rules-error');

exports.getCards = async (req, res, next) => {
  await Card.find({})
    .then((card) => res.send({ card }))
    .catch(next);
};

exports.deleteCardById = async (req, res, next) => {
  await Card.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new RulesError('недостаточно прав'));
      }
      return card.remove().then(() => res.send({ message: 'карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('переданы некорректные данные'));
      } else { next(err); }
    });
};

exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('переданы некорректные данные'));
      } else { next(err); }
    });
};

module.exports.likeCard = async (req, res, next) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('карточка или пользователь не найден');
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('переданы некорректные данные'));
      } else { next(err); }
    });
};

module.exports.dislikeCard = async (req, res, next) => {
  await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('карточка или пользователь не найден');
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('переданы некорректные данные'));
      } else { next(err); }
    });
};
