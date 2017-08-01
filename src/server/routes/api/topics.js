const mongoose = require('mongoose');

const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const { handleErrors, handleNotFound } = require('../../helpers/db');

const Topic = require('../../models/Topic');
const User = require('../../models/User');

module.exports = function(app) {

  app.get('/api/topics/', ensureAuthenticated(), (req, res) => {
    const query = Topic.find();
    if (req.query.select) { query.select(req.query.select); }
    query.exec().then((users, err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(users);
      }
    });
  });

  app.get('/api/topics/:id/', ensureAuthenticated(), (req, res) => {
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
  });

  app.post('/api/topics/', ensureAuthenticated([1, 2]), (req, res) => {
    let newTopic = new Topic();
    Object.assign(newTopic, req.body.data); // copy all data onto newTopic
    newTopic.save()
      .then(createdTopic => {
        res.json(createdTopic);
      })
      .catch(handleErrors(res));
  });

  app.patch('/api/topics/:id/', ensureAuthenticated([1, 2]), (req, res) => {
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
  });

  app.delete('/api/topics/:id/', ensureAuthenticated([1, 2]), (req, res) => {
    Topic.findByIdAndRemove(req.params.id).exec()
      .then(removedTopic => {
        if (!removedTopic) { // topic did not exist
          return handleNotFound(res);
        } else {
          res.status(204).json({});
        }
      })
      .catch(handleErrors(res));
  });

  app.post('/api/topics/:id/sections/', ensureAuthenticated([1, 2]), (req, res) => {
    let data = req.body.data || {};
    let newTopic = {
      _id: mongoose.Types.ObjectId(), // eslint-disable-line new-cap
      name: data.name || '',
      content: data.content || '',
    };
    Topic.findById(req.params.id).exec()
      .then(topic => {
        if (!topic) {
          return handleNotFound(res);
        } else {
          topic.sections.push(newTopic);
          topic.save()
            .then(() => res.json(newTopic))
            .catch(handleErrors(res));
        }
      })
      .catch(handleErrors(res));
  });

  app.patch('/api/topics/:topicId/sections/:sectionId/', ensureAuthenticated([1, 2]), (req, res) => { // eslint-disable-line max-len

    let data = req.body.data || {};
    let updatedSection = {};

    Topic.findById(req.params.topicId).exec()
      .then(topic => {
        if (!topic) {
          return handleNotFound(res);
        } else {
          topic.sections.forEach((section, index) => {
            if (section._id.equals(req.params.sectionId)) { // === won't work on ObjectIds
              updatedSection = Object.assign(topic.sections[index], data);
              topic.sections[index] = updatedSection;
            }
          });
          topic.save()
            .then(() => res.json(updatedSection))
            .catch(handleErrors(res));
        }
      })
      .catch(handleErrors(res));

  });

  /* LINKED RESOURCES */

  app.get('/api/topics/:id/students/', ensureAuthenticated([1, 2]), (req, res) => {
    Topic.findById(req.params.id).populate('students').exec()
      .then(topic => {
        if (!topic) {
          return handleNotFound(res);
        } else {
          res.json(topic.students);
        }
      })
      .catch(handleErrors(res));
  });


  app.post('/api/topics/:id/students/', ensureAuthenticated([1, 2]), (req, res) => {
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
  });

};
