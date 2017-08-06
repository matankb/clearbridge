const sanitizeHtml = require('sanitize-html');

const { Student } = require('../models/User');
require('../models/Topic');

const WORD_SPLIT = /[\s,.?!!@#$%^&*()/\\]+/g;

function stripHtml(topic) {
  return sanitizeHtml(topic.content, {
    allowedTags: [],
  });
}

function getWeightedScore(name, content) {
  return ((name * 2) + content);
}

function getMatch(queryParts, words) {
  const matches = [];
  const matchedQueries = new Set();

  for (const word of words) {
    const queryMatches = queryParts.filter(queryPart => word.toLowerCase().includes(queryPart));

    for (const match of queryMatches) {
      matchedQueries.add(match);
    }

    if (queryMatches.length) {
      matches.push(word);
    }
  }

  return {
    score: matchedQueries.size / queryParts.length,
    matches,
  };

}

async function doSearch(query, userId) {

  const { topics } = await Student.findById(userId).populate('topics').exec();
  const queryParts = query
                      .trim()
                      .toLowerCase()
                      .split(WORD_SPLIT)
                      .filter(Boolean); // remove empty strings
  const searchResults =
    topics
      .map(topic => {
        const nameParts = topic.name.split(WORD_SPLIT);
        const contentParts = stripHtml(topic).split(WORD_SPLIT);
        return {
          id: topic.id,
          nameParts,
          contentParts,
          nameMatch: getMatch(queryParts, nameParts),
          contentMatch: getMatch(queryParts, contentParts),
        };
      })
      .filter(topic => topic.nameMatch.score || topic.contentMatch.score > 0.5)
      .sort((a, b) => {
        const scoreDiff =
          getWeightedScore(b.nameMatch.score, b.contentMatch.score)
          - getWeightedScore(a.nameMatch.score, a.contentMatch.score);
        if (!scoreDiff) {
          return getWeightedScore(
                   b.nameMatch.matches.length / b.nameParts.length,
                   b.contentMatch.matches.length / b.contentParts.length,
                 )
                 - getWeightedScore(
                   a.nameMatch.matches.length / a.nameParts.length,
                   a.contentMatch.matches.length / a.nameParts.length,
                 );
        }
        return scoreDiff;
      });
  return searchResults;
}

exports.search = async (req, res) => {
  const searchResults = (await doSearch(req.query.q, req.user.id)).map(t => t.id);
  res.json(searchResults);
};
