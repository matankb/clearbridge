const mongoose = require('mongoose');
const url = require('url');

const User = require('../models/User');
const Topic = require('../models/Topic');

exports.getUsers = async (req, res) => {
  res.json(await User.find().exec());
};

exports.redirectUser = (req, res) => {
  // redirect so not to duplicate other /users/ routes for /user/
  res.redirect(`/api/users/${req.user._id}/`);
};

exports.redirectUserResource = (req, res) => {
  // similar to above, but for linked resources
  const urlObj = url.parse(req.originalUrl);
  // preserve all other parts of url
  urlObj.pathname = `/api/users/${req.user._id}/${req.params.resource}/`;
  res.redirect(url.format(urlObj));
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  // forbid students from accessing other users
  if (req.user.type === 0 && req.params.id !== req.user.id) {
    return res.status(403).json({ message: 'Requires authentication' });
  } else if (user) {
    res.json(user);
  } else {
    next();
  }
};

exports.createUser = async (req, res) => {
  let newUser;
  switch (req.body.type) {
    case 0:
      newUser = new User.Student();
      break;
    case 1:
      newUser = new User.Teacher();
      break;
    case 2:
      newUser = new User.Admin();
      break;
    default:
      return res.status(400).json({ message: 'New user must include type' });
  }
  newUser.name = req.body.data.name;
  newUser.email = req.body.data.email;
  res.json(await newUser.save());
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  if (!user) {
    next();
  } else {
    // merge existing model with new data
    user.type = req.body.type || user.type;
    Object.assign(user, req.body.data);
    res.json(await user.save());
  }
};

exports.deleteUser = async (req, res, next) => {
  const removedUser = await User.findByIdAndRemove(req.params.id).exec();
  if (!removedUser) { // user did not exist
    next();
  } else {
    res.status(204).json({});
  }
};

/* LINKED RESOURCES */

exports.getTopics = async (req, res) => {
  // population won't work with just User, and only Students will have topics field
  const query = User.Student.findById(req.params.id);
  if (req.query.select) {
    query.populate('topics', req.query.select);
  } else {
    query.populate('topics');
  }
  // res.json(await query.exec());
  const { topics } = await query.exec();
  res.json(topics);
};

exports.assignTopic = async (req, res) => {
  const user = await User.findById(req.params.id);
  const topic = await Topic.findById(req.body._id);

  const userId = user._id;
  const topicId = mongoose.Types.ObjectId(req.body._id);

  if (user.topics.find(id => id.equals(topicId))) {
    res.status(409).json({ message: 'Topic already assigned' }); // 409 conflict
  }

  user.topics.push(topicId);
  topic.students.push(userId);
  await topic.save();
  res.status(201).json(await user.save()); // 201 created
};
