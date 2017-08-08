import tinycolor from 'tinycolor2';
import fetchReject from 'fetch-reject';

export function fetchJson(url, opts) {
  return fetchReject(url, { credentials: 'same-origin', ...opts })
    .then(r => r.json());
}

export function formatError(error) {
  return {
    offline: !error.status, // failed to fetch errors (therefore offline) don't include a status
    status: error.status,
  };
}

/**
 * Returns white or black depending on the background color.
 */
export function getTextColor(backgroundColor) {
  return tinycolor(backgroundColor).isLight() ? 'black' : 'white';
}

export function parseQuery(query) {
  const queryParts = query.slice(1).split('&');
  const ret = {};
  for (const part of queryParts) {
    if (!part) continue; // eslint-disable-line no-continue
    const [key, val] = part.split('=');
    ret[key] = decodeURIComponent(val);
  }
  return ret;
}

export function goBack(location, history, defaultPath) {
  if (!location.state || !location.state.inApp) {
    history.replace(defaultPath);
  } else {
    history.goBack();
  }
}
