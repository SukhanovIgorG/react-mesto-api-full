const mongoose = require('mongoose');
const validator = require('validator');

const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minLength: 2,
      maxLength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minLength: 2,
      maxLength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(v) {
          const regUrl = /[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/gi;
          return regUrl.test(v);
        },
        message: (props) => `${props.value} is not a valid url!`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

exports.User = mongoose.model('user', userShema);
