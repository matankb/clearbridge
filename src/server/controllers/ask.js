const Ask = require('../models/Ask');
const Topic = require('../models/Topic');

exports.getAsks = async (req, res) => {
  res.json(await Ask.find().populate('topic', 'name color').exec());
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

exports.updateAsk = async (req, res, next) => {
  const ask = await Ask.findById(req.params.id).exec();
  if (!ask) {
    next();
  } else {
    // merge existing model with new data
    Object.assign(ask, req.body.data);
    res.json(await ask.save());
  }
};

exports.deleteAsk = async (req, res, next) => {
  const deletedAsk = await Ask.findByIdAndRemove(req.params.id).exec();
  if (!deletedAsk) { // ask did not exist
    next();
  } else {
    res.json({});
  }
};
