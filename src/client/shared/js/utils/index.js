import tinycolor from 'tinycolor2';

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
