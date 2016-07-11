const ensureAuthenticated = require('../../middleware/ensure-authenticated');
const User = require('../../models/User');
const { handleErrors, handleNotFound } = require('../../helpers/db');

module.exports = function(app) {

  app.get('/api/users/', ensureAuthenticated([1, 2]), (req, res) => {
    User.find().exec()
      .then((users, err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(users);
        }
      });
  });

  app.get('/api/user/', ensureAuthenticated(), (req, res) => {
    res.json(req.user);
  });

  app.get('/api/users/:id/', ensureAuthenticated([1, 2]), (req, res) => {
    User.findById(req.params.id).exec()
      .then(user => {
        if (user) {
          return res.json(user);
        } else {
          return handleNotFound(res);
        }
      })
      .catch(handleErrors(res));
  });

  app.post('/api/users/', ensureAuthenticated.admin, (req, res) => {
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
  });

  app.patch('/api/users/:id/', ensureAuthenticated.admin, (req, res) => {
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
  });

  app.delete('/api/users/:id/', ensureAuthenticated.admin, (req, res) => {
    User.findByIdAndRemove(req.params.id).exec()
      .then(removedUser => {
        if (!removedUser) { // user did not exist
          return handleNotFound(res);
        } else {
          res.status(204).json({});
        }
      })
      .catch(handleErrors(res));
  });

};
