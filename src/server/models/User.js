const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('mongoose-schema-extend');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  localAuth: { password: String },
  google: { id: String },
}, { collection: 'users', discriminatorKey: '_type' });

userSchema.methods.generateHash = function(password) {
  return bcrypt.hash(password, 8);  // returns promise
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.localAuth.password); // returns promise
};

const studentSchema = userSchema.extend({
  type: { type: Number, default: 0 },
  topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
});

const teacherSchema = userSchema.extend({
  type: { type: Number, default: 1 },
});

const adminSchema = userSchema.extend({
  type: { type: Number, default: 2 },
});


const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = User;
module.exports.Student = Student;
module.exports.Teacher = Teacher;
module.exports.Admin = Admin;
