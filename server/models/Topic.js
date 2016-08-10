const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: String,
  color: String, // hex code
  image: String, // path to image
  sections: [{
    title: String,
    content: String,
  }],
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
