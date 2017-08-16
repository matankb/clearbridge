const Ask = require('../models/Ask');

exports.getAsks = async (req, res) => {
  res.json(await Ask.find().exec());
};

exports.createAsk = async (req, res) => {
  const ask = new Ask();
  ask.asker = req.user.id;
  Object.assign(ask, req.body.data);
  res.json(await ask.save());
};
