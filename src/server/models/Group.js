const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  students: [],
  /* filter is fn that is run with new student array filter method.
   * should take student obj. and return true if applies is applied to this group.
  */
  filter: Schema.Types.Mixed,
});

groupSchema.methods.addNewUsers = function(users) {
  this.students.push(
    ...users.filter(this.filter),
  );
  // TODO: setup error handling
  this.save();
};

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
