const { doSearch } = require('./algo');

const { Student } = require('../../models/User');
require('../../models/Topic');


// CONTROLLER
exports.search = async (req, res) => {
  const { topics } = await Student.findById(req.user.id).populate('topics').exec();
  res.json(await doSearch(topics, req.query.q));
};
