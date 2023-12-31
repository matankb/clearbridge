const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');

const { Schema } = mongoose;

const sanitizeOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'img', 'u', 's'],
  allowedSchemesByTag: {
    img: ['data'],
  },
};

function sanitizeContent(content) {
  return sanitizeHtml(content, sanitizeOptions);
}

const topicSchema = new Schema({
  name: String,
  color: String, // hex code
  image: String, // path to image
  blurb: String,
  content: { type: String, set: sanitizeContent },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  asks: [{ type: Schema.Types.ObjectId, ref: 'Ask' }],
  externalLink: String,
  essentials: [{ type: Schema.Types.ObjectId, ref: 'Essential' }],
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
