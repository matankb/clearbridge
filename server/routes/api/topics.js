const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const Topic = require('../../models/Topic');
const { handleErrors, handleNotFound } = require('../../helpers/db');

module.exports = function(app) {

  app.get('/api/topics/', ensureAuthenticated(), (req, res) => {
    Topic.find().exec()
      .then((users, err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(users);
        }
      });
  });

  app.get('/api/topics/:id/', ensureAuthenticated(), (req, res) => {
    Topic.findById(req.params.id).exec()
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
    Object.assign(newTopic, req.body.data);
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

};
