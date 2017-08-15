const Ask = require('../models/Ask');

exports.getAsks = async (req, res) => {
  res.json(await Ask.find().exec());
};
