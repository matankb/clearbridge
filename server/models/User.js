const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const extend = require('mongoose-schema-extend'); // eslint-disable-line no-unused-vars

const userSchema = new Schema({
  email: String,
  name: { type: String },
  google: { id: String },
}, { collection: 'users', discriminatorKey: '_type' });

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
