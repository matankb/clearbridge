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
