import React from 'react';

import ExternalLink from '~/shared/js/components/ExternalLink';
import '../../../css/about.less';


const AboutText = () => (
  <div className="about">
    <h3>Created by
      <ExternalLink href="http://matankb.github.io/"> Matan Kotler-Berkowitz</ExternalLink>
    </h3>
    <h4>Special Thanks</h4>
    <div>
      <div className="col" >
        <p>Jared Matas</p>
        <p>Emily Charton</p>
        <p>Gavi Elkind</p>
      </div>
      <div className="col" >
        <p>Robert Neumann</p>
        <p>Noam Raz</p>
        <p>JCDS Class of 2017</p>
      </div>
      <div className="col" >
        <p>Andrea Silton</p>
        <p>Mimi Gammon</p>
        <p>Samara Hendin Soiref</p>
      </div>
    </div>
    <h4>Open Source Credits</h4>
    <div className="open-source">
      <ExternalLink href="https://facebook.github.io/react/">React</ExternalLink>
      <ExternalLink href="http://redux.js.org/">Redux</ExternalLink>
      <ExternalLink href="https://github.com/reactjs/react-redux">React-Redux</ExternalLink>
      <ExternalLink href="http://www.material-ui.com/">Material UI</ExternalLink>
      <ExternalLink href="https://nodejs.org">NodeJS</ExternalLink>
      <ExternalLink href="https://webpack.github.io/">Webpack</ExternalLink>
      <ExternalLink href="https://babeljs.io/">Babel</ExternalLink>
      <ExternalLink href="http://lesscss.org/">Less</ExternalLink>
      <ExternalLink href="https://expressjs.com/">Express</ExternalLink>
      <ExternalLink href="http://passportjs.org/">Passport</ExternalLink>
      <ExternalLink href="https://www.mongodb.com/">MongoDB</ExternalLink>
      <ExternalLink href="http://mongoosejs.com/">Mongoose</ExternalLink>
    </div>
  </div>
);
export default AboutText;
