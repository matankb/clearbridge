const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const Class = require('../../models/Class');
const { handleErrors, handleNotFound } = require('../../helpers/db');

module.exports = function(app) {

  app.get('/api/classes/', ensureAuthenticated([1, 2]), (req, res) => {
    Class.find().exec()
      .then((users, err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(users);
        }
      });
  });

  app.get('/api/classes/:id/', ensureAuthenticated([1, 2]), (req, res) => {
    Class.findById(req.params.id).exec()
      .then(class_ => {
        if (class_) {
          return res.json(class_);
        } else {
          return handleNotFound(res);
        }
      })
      .catch(handleErrors(res));
  });

  app.post('/api/classes/', ensureAuthenticated([1, 2]), (req, res) => {
    let newClass = new Class();
    Object.assign(newClass, req.body.data);
    newClass.save()
      .then(createdClass => {
        res.json(createdClass);
      })
      .catch(handleErrors(res));
  });

  app.patch('/api/classes/:id/', ensureAuthenticated([1, 2]), (req, res) => {
    Class.findById(req.params.id).exec()
      .then(class_ => {
        if (!class_) {
          return handleNotFound(res);
        } else {
          // merge existing model with new data
          Object.assign(class_, req.body.data);
          class_.save()
            .then(updatedClass => res.json(updatedClass))
            .catch(handleErrors(res));
        }
      });
  });

  app.delete('/api/classes/:id/', ensureAuthenticated([1, 2]), (req, res) => {
    Class.findByIdAndRemove(req.params.id).exec()
      .then(removedClass => {
        if (!removedClass) { // class did not exist
          return handleNotFound(res);
        } else {
          res.status(204).json({});
        }
      })
      .catch(handleErrors(res));
  });

};
