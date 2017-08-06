export function findTopicById(topicList, id) {
  return topicList.find(topic => topic.id === id);
}
