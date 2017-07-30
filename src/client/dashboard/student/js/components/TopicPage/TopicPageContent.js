import React from 'react';

const TopicPageContent = ({ sections }) => (
  <main>
    {
      sections.map(section => (
        <section key={ section._id }>
          <h1>{ section.name }</h1>
          <p>{ section.content }</p>
        </section>
      ))
    }
  </main>
);

export default TopicPageContent;
