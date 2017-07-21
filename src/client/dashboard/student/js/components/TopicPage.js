import React from 'react';
import { connect } from 'react-redux';

import '../../css/topic-page.less';

let TopicPage = props => {
  return (
    <div className={ props.open ? 'page open' : 'page'}>
      <div className="header" style={{ backgroundColor: String(props.color) }}>
        <div className="left">
          <img src={ props.image } />
        </div>
        <div className="right">
          <h1 className="title">{ props.name }</h1>
          <p className="subtitle">OVERVIEW</p>
          <p className="blurb">
            { props.blurb }
          </p>
        </div>
      </div>
      <nav>
      <span>Sections</span>
      <ul>
        {
          props.sections.map(section => <li>{ section.name }</li>)
        }
      </ul>
    </nav>
    <main>
      {
        props.sections.map(section => {
          return (
            <section>
              <h1>{ section.name }</h1>
              <p>{ section.content }</p>
              <hr />
            </section>
          );
        })
      }
    </main>
    </div>

  );
};


function getTopicById(_id, topics) {
  return topics.filter(topic => topic._id === _id)[0] || {};
}

function mapStateToProps(state) {
  let topic = getTopicById(state.topics.selectedTopic, state.topics.topics);
  return {
    open: state.topics.topicPageOpen,
    color: topic.color,
    name: topic.name,
    image: topic.image,
    blurb: topic.blurb,
    sections: topic.sections || [],
  };
}

TopicPage = connect(mapStateToProps)(TopicPage);

export default TopicPage;
