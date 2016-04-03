const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const extend = require('mongoose-schema-extend');

const userSchema = new Schema({

}, { collection: 'users', discriminatorKey: '_type' });

const studentSchema = userSchema.extend({

});

const teacherSchema = userSchema.extend({

});

const adminSchema = userSchema.extend({

});

const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = User;
module.exports.Student = Student;
module.exports.Teacher = Teacher;
module.exports.admin = Admin;
