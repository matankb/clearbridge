import React from 'react';

import '../../../css/topic-page.less';

const TopicPage = props => {

  const { data } = props.topic;

  return (
    <div className="page">
      <div className="header" style={{ backgroundColor: data.color }}>
        <div className="left">
          <img src={data.image} alt={data.name} />
        </div>
        <div className="right">
          <h1 className="title">{data.name}</h1>
          <p className="subtitle">OVERVIEW</p>
          <p className="blurb">
            {data.blurb}
          </p>
        </div>
      </div>
      <nav>
        <span>Sections</span>
        <ul>
          {
            data.sections.map(section => <li key={section._id}>{section.name}</li>)
          }
        </ul>
      </nav>
      <main>
        {
          data.sections.map(section => {
            return (
              <section key={section._id}>
                <h1>{section.name}</h1>
                <p>{section.content}</p>
                <hr />
              </section>
            );
          })
        }
      </main>
    </div>

  );
};


export default TopicPage;
