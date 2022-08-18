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
