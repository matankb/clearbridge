const mongoose = require('mongoose');

const askSchema = mongoose.Schema({
  asker: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  question: String,
  answer: String,
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
});

const Ask = mongoose.model('Ask', askSchema);

module.exports = Ask;
