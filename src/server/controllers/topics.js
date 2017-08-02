const { handleErrors, handleNotFound } = require('../helpers/db');

const Topic = require('../models/Topic');
const User = require('../models/User');

exports.getTopics = (req, res) => {
  const query = Topic.find();
  if (req.query.select) { query.select(req.query.select); }
  query.exec().then((users, err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(users);
    }
  });
};

exports.getTopic = (req, res) => {
  const query = Topic.findById(req.params.id);
  if (req.query.select) { query.select(req.query.select); }
  query.exec()
    .then(topic => {
      if (topic) {
        return res.json(topic);
      } else {
        return handleNotFound(res);
      }
    })
    .catch(handleErrors(res));
};

exports.createTopic = (req, res) => {
  let newTopic = new Topic();
  Object.assign(newTopic, req.body.data); // copy all data onto newTopic
  newTopic.save()
    .then(createdTopic => {
      res.json(createdTopic);
    })
    .catch(handleErrors(res));
};

exports.updateTopic = (req, res) => {
  Topic.findById(req.params.id).exec()
    .then(topic => {
      if (!topic) {
        return handleNotFound(res);
      } else {
        // merge existing model with new data
        Object.assign(topic, req.body.data);
        topic.save()
          .then(updatedTopic => res.json(updatedTopic))
          .catch(handleErrors(res));
      }
    });
};

exports.deleteTopic = (req, res) => {
  Topic.findByIdAndRemove(req.params.id).exec()
    .then(removedTopic => {
      if (!removedTopic) { // topic did not exist
        return handleNotFound(res);
      } else {
        res.status(204).json({});
      }
    })
    .catch(handleErrors(res));
};

/* LINKED RESOURCES */

exports.getStudents = (req, res) => {
  Topic.findById(req.params.id).populate('students').exec()
    .then(topic => {
      if (!topic) {
        return handleNotFound(res);
      } else {
        res.json(topic.students);
      }
    })
    .catch(handleErrors(res));
};


exports.addStudent = (req, res) => {
  Topic.findById(req.params.id).exec()
    .then(topic => {
      if (!topic) {
        return handleNotFound(res);
      } else {
        topic.students.push(req.body._id);
        topic.save()
          .then(() => {
            User.Student.findById(req.body._id).exec()
              .then(student => {
                if (!student) {
                  return handleNotFound(res);
                } else {
                  student.topics.push(req.params.id);
                  student.save()
                    .then(updatedStudent => res.json(updatedStudent))
                    .catch(handleErrors(res));
                }
              });
          },
        )
          .catch(handleErrors(res));
      }
    })
    .catch(handleErrors(res));
};
