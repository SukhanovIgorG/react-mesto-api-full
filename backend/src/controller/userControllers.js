/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../../errors/not-found-error');
const CastError = require('../../errors/cast-error');
const MongoError = require('../../errors/mongo-error');
const AuthError = require('../../errors/auth-error');

const { User } = require('../../models/usersModels');

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
          // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          // аутентификация успешна
          return user;
        })
        .then((userAuth) => {
          const token = jwt.sign({ _id: userAuth._id }, 'super-strong-secret-key', { expiresIn: '1d' });
          res
            // .cookie('jwt', token, {
            //   maxAge: 3600000 * 24 * 7,
            //   httpOnly: true, // выключили доступ из ЖС
            //   sameSite: true, // только этот домена
            // })
            .send({ 
              token,
              // message: 'авторизация прошла очень успешно' 
            });
        });
    })
    .catch(() => {
      next(new AuthError('ошибка авторизации'));
    });
};

exports.getUsers = async (req, res, next) => {
  await User.find({})
    .then((user) => res.send({ user }))
    .catch(next);
};

exports.getUserInfo = async (req, res, next) => {
  await User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

exports.getUserById = async (req, res, next) => {
  await User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ user });
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('переданы некорректные данные'));
      } else { next(err); }
    });
};

exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((userWithPass) => {
      const userWithOutPass = {
        _id: userWithPass._id,
        name: userWithPass.name,
        about: userWithPass.about,
        avatar: userWithPass.avatar,
        email: userWithPass.email,
      };
      return userWithOutPass;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Неверный запрос или данные'));
      }
      if (err.code === 11000) {
        return next(new MongoError('Пользователь с таким email уже существует'));
      }
      next(err);
    });
};

exports.updateUserInfo = async (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  await User.findByIdAndUpdate(
    owner,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('переданы некорректные данные'));
      } else { next(err); }
    });
};

exports.updateUserAvatar = async (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  await User.findByIdAndUpdate(
    owner,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('переданы некорректные данные'));
      } else { next(err); }
    });
};
