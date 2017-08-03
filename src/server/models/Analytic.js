const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const analyticSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  path: String,
  timestamp: String,
});

const Analytic = mongoose.model('Analytic', analyticSchema);

module.exports = Analytic;
