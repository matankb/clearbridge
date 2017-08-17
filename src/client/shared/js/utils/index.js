import tinycolor from 'tinycolor2';

/**
 * Returns white or black depending on the background color.
 */
export function getTextColor(backgroundColor) {
  return tinycolor(backgroundColor).isLight() ? 'black' : 'white';
}

export function goBack(location, history, defaultPath) {
  if (!location.state || !location.state.inApp) {
    history.replace(defaultPath);
  } else {
    history.goBack();
  }
}

export function getTopicById(topicList, id) {
  return topicList.find(topic => topic.id === id);
}

