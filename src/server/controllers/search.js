const sanitizeHtml = require('sanitize-html');

const { Student } = require('../models/User');
require('../models/Topic');

const WORD_SPLIT = /[^\w']+/g;
const ELLIPSIS_CHAR = String.fromCharCode(0x2026);

function stripHtml(topic) {
  // append space after LIs and block elements
  return sanitizeHtml(
    sanitizeHtml(
      sanitizeHtml(topic.content, {
        allowedTags: ['h1', 'li', 'p'],
      }),
      {
        allowedTags: [],
        textFilter: text => `${text} `,
      },
    ),
  );
}

// returns index of each piece, as well as its' content
function split(string, sep) {
  const output = [];
  let prevLastIndex = 0;
  let match;
  while (match = sep.exec(string)) { // eslint-disable-line no-cond-assign
    if (sep.lastIndex > prevLastIndex) {
      output.push({
        index: prevLastIndex,
        str: string.slice(prevLastIndex, match.index),
      });
    } else {
      sep.lastIndex++;
    }
    prevLastIndex = sep.lastIndex;
  }
  output.push({
    index: prevLastIndex,
    str: string.slice(prevLastIndex),
  });
  return output;
}

function formatBackgroundString(string, isBeginning) {

  const words = split(string, WORD_SPLIT);

  if (isBeginning) {

    if (words.length <= 5) return string; // nothing to do, content too short
    return ELLIPSIS_CHAR + string.slice(words[words.length - 5].index);

  } else { // middle of string

    if (words.length <= 10) return string;
    const beginning = string.slice(0, words[4].index + words[4].str.length);
    const end = string.slice(words[words.length - 5].index);
    return `${beginning} ${ELLIPSIS_CHAR} ${end}`;

  }

}

function formatEndString(string, matches) {

  let words = split(string, WORD_SPLIT);

  if (words.length > 5) {
    string = string.slice(0, words[4].index + words[4].str.length) + ELLIPSIS_CHAR;
    words = words.slice(0, 5);
  }

  let index = 0;
  let strIndex = 0;
  const output = [];

  for (const match of matches) {
    const matchIndex = words.slice(index).findIndex(word => word.str === match) + index;
    if (matchIndex - index === -1) {
      break;
    }
    output.push({
      type: 'background',
      content: string.slice(strIndex, words[matchIndex].index),
    });
    output.push({
      type: 'match',
      content: match,
    });
    index = matchIndex + 1;
    strIndex = words[matchIndex].index + match.length;
  }

  output.push({
    type: 'background',
    content: string.slice(strIndex),
  });

  return output;

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
        const content = stripHtml(topic);
        const contentParts = content.split(WORD_SPLIT);

        return {
          id: topic.id,
          content,
          nameParts,
          contentParts,
          nameMatch: getMatch(queryParts, nameParts),
          contentMatch: getMatch(queryParts, contentParts),
        };

      })
      .filter(result => result.nameMatch.score || result.contentMatch.score > 0.5)
      .sort((a, b) => {

        const aScore = getWeightedScore(a.nameMatch.score, a.contentMatch.score);
        const bScore = getWeightedScore(b.nameMatch.score, b.contentMatch.score);
        const scoreDiff = bScore - aScore;

        if (scoreDiff) return scoreDiff;

        const aMatches = getWeightedScore(
          a.nameMatch.matches.length / a.nameParts.length,
          a.contentMatch.matches.length / a.contentParts.length,
        );
        const bMatches = getWeightedScore(
          b.nameMatch.matches.length / b.nameParts.length,
          b.contentMatch.matches.length / b.contentParts.length,
        );
        return bMatches - aMatches;

      })
      .map(result => {

        const SNIPPET_COUNT = 2;
        const parts = [];
        const matchCount = Math.min(result.contentMatch.matches.length, SNIPPET_COUNT);
        let index = 0;

        for (let i = 0; i < matchCount; i++) {

          const match = result.contentMatch.matches[i];
          let matchIndex = result.content.indexOf(match, index);

          parts.push({
            type: 'background',
            content: formatBackgroundString(
              result.content.slice(index, matchIndex),
              i === 0,
            ),
          });

          parts.push({ type: 'match', content: match });
          index = matchIndex + match.length;

        }

        parts.push(
          ...formatEndString(
            result.content.slice(index),
            result.contentMatch.matches.slice(SNIPPET_COUNT),
          ),
        );

        return { id: result.id, parts };
      });

  return searchResults;
}

exports.search = async (req, res) => {
  const searchResults = await doSearch(req.query.q, req.user.id);
  res.json(searchResults);
};
