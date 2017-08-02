import React from 'react';
import TopicCard from './TopicCard/';

const TopicList = props => {
  return (
    <div className="topic-list">
      {
        props.topics.map(topic => {
          return (
            <TopicCard
              id={ topic._id }
              key={ topic._id }
              name={ topic.name }
              blurb={ topic.blurb }
              image={ topic.image }
              color={ topic.color }
              handleTopicClick={
                () => {
                  props.setSelectedTopic(topic._id)();
                  props.toggleTopicPage();
                }
              }
            />
          );
        })
      }
    </div>
  );
};

export default TopicList;
