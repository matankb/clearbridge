const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');

const Schema = mongoose.Schema;

const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'img']),
};

function sanitizeContent(content) {
  return sanitizeHtml(content, sanitizeOptions);
}

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
  content: { type: String, set: sanitizeContent },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
