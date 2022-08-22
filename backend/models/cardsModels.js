const mongoose = require('mongoose');

const cardShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regUrl = /[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?/gi;
          return regUrl.test(v);
        },
        message: (props) => `${props.value} is not a valid url!`,
      },
    },
    owner: {
      type: mongoose.ObjectId,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

exports.Card = mongoose.model('card', cardShema);
