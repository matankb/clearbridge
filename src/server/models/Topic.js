const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: String,
  color: String, // hex code
  image: String, // path to image
  blurb: String,
  sections: [{
    _id: Schema.Types.ObjectId,
    name: String,
    content: String,
  }],
  students: [],
  groups: [],
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
