const sanitizeHtml = require('sanitize-html');

// CONSTANTS

const SNIPPET_LENGTH = 4;

const WORD_SPLIT = /[^\w']+/g;
const ELLIPSIS_CHAR = String.fromCharCode(0x2026);

// HELPER FUNCTIONS

function stripHtml(topic) {
  // remove all tags, leave text as-is
  // append space after LIs and block elements
  return sanitizeHtml(sanitizeHtml(
    sanitizeHtml(topic.content, {
      allowedTags: ['h1', 'li', 'p'],
    }),
    {
      allowedTags: [],
      textFilter: text => `${text} `,
    },
  ));
}

// returns index of each piece, as well as its' content
function split(string, sep) {
  const output = [];
  let prevLastIndex = 0;
  let match;
  while (match = sep.exec(string)) { // eslint-disable-line no-cond-assign
    // a match was found
    if (sep.lastIndex > prevLastIndex) {
      output.push({
        index: prevLastIndex,
        str: string.slice(prevLastIndex, match.index),
      });
    } else {
      // no match, try next char
      sep.lastIndex++;
    }
    prevLastIndex = sep.lastIndex;
  }
  // add rest of string
  output.push({
    index: prevLastIndex,
    str: string.slice(prevLastIndex),
  });
  return output;
}

function formatBackgroundString(string, isBeginning) {

  const words = split(string, WORD_SPLIT);

  if (isBeginning) {

    if (words.length <= SNIPPET_LENGTH) return string; // nothing to do, content too short
    return ELLIPSIS_CHAR + string.slice(words[words.length - SNIPPET_LENGTH - 1].index);

  } else { // middle of string

    if (words.length <= 2 * SNIPPET_LENGTH) return string;

    const beginning = string.slice(
      0,
      words[SNIPPET_LENGTH].index + words[SNIPPET_LENGTH].str.length,
    ); // first SNIPPET_LENGTH words

    // last SNIPPET_LENGTH words
    const end = string.slice(words[words.length - SNIPPET_LENGTH - 1].index);

    return `${beginning} ${ELLIPSIS_CHAR} ${end}`;

  }

}

// mark any remaining search results in last background snippet
function formatEndString(string, matches) {

  let words = split(string, WORD_SPLIT);

  // make sure only SNIPPET_LENGTH words are taken
  if (words.length > SNIPPET_LENGTH) {
    string = string.slice(
      0,
      words[SNIPPET_LENGTH].index + words[SNIPPET_LENGTH].str.length,
    ) + ELLIPSIS_CHAR;
    words = words.slice(0, SNIPPET_LENGTH + 1);
  }

  let index = 0;
  let strIndex = 0;
  const output = [];

  // search for match in remaining words
  for (const match of matches) {
    const matchIndex = words.slice(index).findIndex(word => word.str === match) + index;
    if (matchIndex - index === -1) { // the original index was -1, so no more matches
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

  // add last unmatched snippets
  output.push({
    type: 'background',
    content: string.slice(strIndex),
  });

  return output;

}

function getWeightedScore(name, content) {
  return ((name * 2) + content);
}

function testMatch(query, word) {
  if (!word.toLowerCase().includes(query)) {
    return 0;
  }

  return query.length / word.length;
}

function getMatches(queryParts, words) {
  const matches = [];
  const queryMatches = new Map();

  for (const query of queryParts) {
    queryMatches.set(query, []); // all matches are initially empty
  }

  for (const word of words) {
    const wordMatches =
      queryParts
        .map(query => ({
          query,
          score: testMatch(query, word),
        }))
        .filter(match => match.score > 0);

    if (wordMatches.length) {
      matches.push(word);
    }

    for (const { query, score } of wordMatches) {
      queryMatches.get(query).push(score); // record per-query scores
    }
  }

  // Average scores for every query individually, and then average the averages.
  let totalQueryMatches = 0;

  for (const [, scores] of queryMatches) {
    const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length) || 0;
    totalQueryMatches += avgScore;
  }

  return {
    score: totalQueryMatches / queryParts.length,
    matches,
  };

}

exports.doSearch = (topics, query) => {
  const queryParts = query
    .trim()
    .toLowerCase()
    .split(WORD_SPLIT)
    .filter(Boolean); // remove empty strings

  return topics
    .map(topic => {
      const nameParts = topic.name.split(WORD_SPLIT);
      const content = stripHtml(topic);
      const contentParts = content.split(WORD_SPLIT);

      const nameMatch = getMatches(queryParts, nameParts);
      const contentMatch = getMatches(queryParts, contentParts);

      return {
        id: topic.id,
        content,
        nameParts,
        contentParts,
        nameMatch,
        contentMatch,
      };

    })
    .filter(result => result.nameMatch.score || result.contentMatch.score > 0.3)
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

      /* add match snippets */

      const SNIPPET_COUNT = 2;
      const parts = [];
      const matchCount = Math.min(result.contentMatch.matches.length, SNIPPET_COUNT);
      let index = 0; // index in string of end of prev match

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

      // highlight remaining matches
      parts.push(...formatEndString(
        result.content.slice(index),
        result.contentMatch.matches.slice(SNIPPET_COUNT),
      ));

      return { id: result.id, parts };
    });
};
