const Topic = require('../models/Topic');

exports.getTopics = async (req, res) => {
  const query = Topic.find();
  if (req.query.select) { query.select(req.query.select); }
  res.json(await query.exec());
};

exports.getTopic = async (req, res, next) => {
  const query = Topic.findById(req.params.id);
  if (req.query.select) { query.select(req.query.select); }
  const topic = await query.exec();
  if (topic) {
    res.json(topic);
  } else {
    next(res);
  }
};

exports.createTopic = async (req, res) => {
  let newTopic = new Topic();
  Object.assign(newTopic, req.body.data); // copy all data onto newTopic
  res.json(await newTopic.save());
};

exports.updateTopic = async (req, res, next) => {
  const topic = await Topic.findById(req.params.id).exec();
  if (!topic) {
    next();
  } else {
    // merge existing model with new data
    Object.assign(topic, req.body.data);
    res.json(await topic.save());
  }
};

exports.deleteTopic = async (req, res, next) => {
  const removedTopic = await Topic.findByIdAndRemove(req.params.id).exec();
  if (!removedTopic) { // topic did not exist
    next();
  } else {
    res.status(204).json({});
  }
};

/* LINKED RESOURCES */

exports.getStudents = async (req, res, next) => {
  const topic = await Topic.findById(req.params.id).populate('students').exec();
  if (!topic) {
    next();
  } else {
    res.json(topic.students);
  }
};

exports.getAsks = async (req, res, next) => {
  const topic = await Topic.findById(req.params.id).populate('asks').exec();
  if (!topic) {
    next();
  } else {
    res.json(topic.asks);
  }
};
