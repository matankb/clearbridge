const Ask = require('../models/Ask');
const Topic = require('../models/Topic');

exports.getAsks = async (req, res) => {
  res.json(await Ask.find().exec());
};

exports.createAsk = async (req, res) => {
  const ask = new Ask();
  const topic = await Topic.findById(req.body.data.topic);

  ask.asker = req.user.id;
  Object.assign(ask, req.body.data);

  topic.asks.push(ask.id);
  await topic.save();
  res.json(await ask.save());
};
