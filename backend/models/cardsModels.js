const mongoose = require('mongoose');
const validator = require('validator');

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
        validator: (v) => validator.isURL(v),
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
