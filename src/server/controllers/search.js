const sanitizeHtml = require('sanitize-html');

const { Student } = require('../models/User');
require('../models/Topic');

const WORD_SPLIT = /[\s,.?!!@#$%^&*()/\\]+/g;

function stripHtml(topic) {
  return sanitizeHtml(topic.content, {
    allowedTags: [],
  });
}

function fuzzySearch(word, queryParts) {
  return queryParts.some(queryPart => word.toLowerCase().includes(queryPart));
}
function getMatch(queryParts, words) {
  let matchCount = 0;
  const matches = [];
  for (const word of words) {
    if (fuzzySearch(word, queryParts)) {
      matchCount++;
      matches.push(word);
    }
  }
  return {
    score: matchCount / queryParts.length,
    matches,
  };
}

async function doSearch(query, userId) {

  const { topics } = await Student.findById(userId).populate('topics').exec();
  const queryParts = query.trim().toLowerCase().split(WORD_SPLIT);

  const searchResults =
    topics
      .map(topic => ({
        id: topic.id,
        contentMatch: getMatch(queryParts, stripHtml(topic).split(WORD_SPLIT)),
        nameMatch: getMatch(queryParts, topic.name.split(WORD_SPLIT)),
      }))
      .filter(topic => topic.nameMatch.score || topic.contentMatch.score >= 0.5)
      .sort((a, b) => (
        Math.sign(((b.nameMatch.score * 2) + b.contentMatch.score) - ((a.nameMatch.score * 2) + a.contentMatch.score))
      ));

  return searchResults;
}

exports.search = async (req, res) => {
  const searchResults = (await doSearch(req.query.q, req.user.id)).map(t => t.id);
  res.json(searchResults);
};
