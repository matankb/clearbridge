const mongoose = require('mongoose');
const url = require('url');

const User = require('../models/User');
const { handleErrors, handleNotFound } = require('../helpers/db');

exports.getUsers = (req, res) => {
  User.find().exec()
    .then((users, err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(users);
      }
    });
};

exports.redirectUser = (req, res) => {
  // redirect so not to duplicate other /users/ routes for /user/
  res.redirect(`/api/users/${req.user._id}/`);
};

exports.redirectUserResource = (req, res) => {
  // similar to above, but for linked resources
  const urlObj = url.parse(req.originalUrl);
  urlObj.pathname = `/api/users/${req.user._id}/${req.params.resource}/`; // preserve all other parts of url
  res.redirect(url.format(urlObj));
};

exports.getUser = (req, res) => {
  User.findById(req.params.id).exec()
    .then(user => {
      if (user) {
        return res.json(user);
      } else {
        return handleNotFound(res);
      }
    })
    .catch(handleErrors(res));
};

exports.createUser = (req, res) => {
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
  newUser.save()
    .then(createdUser => {
      res.json(createdUser);
    })
    .catch(handleErrors(res));
};

exports.updateUser = (req, res) => {
  User.findById(req.params.id).exec()
    .then(user => {
      if (!user) {
        return handleNotFound(res);
      } else {
        // merge existing model with new data
        user.type = req.body.type || user.type;
        Object.assign(user, req.body.data);
        user.save()
          .then(updatedUser => res.json(updatedUser))
          .catch(handleErrors(res));
      }
    });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id).exec()
    .then(removedUser => {
      if (!removedUser) { // user did not exist
        return handleNotFound(res);
      } else {
        res.status(204).json({});
      }
    })
    .catch(handleErrors(res));
};

/* LINKED RESOURCES */

exports.getTopics = (req, res) => {
  // population won't work with just User, and only Students will have topics field
  const query = User.Student.findById(req.params.id);
  if (req.query.select) {
    query.populate('topics', req.query.select);
  } else {
    query.populate('topics');
  }
  query.exec().then(user => {
    res.json(user.topics);
  })
    .catch(handleErrors(res));
};

exports.assignTopic = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user.topics.indexOf(req.body._id) > -1) {
        return res.status(409).json({ message: 'Topic already assigned' }); // 409 conflict
      }
      user.topics.push(mongoose.Types.ObjectId(req.body._id)); // eslint-disable-line new-cap
      user.save()
        .then(res.status(201).send(mongoose.Types.ObjectId(req.body._id))) // eslint-disable-line new-cap, max-len
        .catch(handleErrors(res));
    })
    .catch(handleErrors(res));
};
