import React from 'react';
import '../../../css/about.less';

const AboutText = () => (
  <div className="about">
    <h3>Created by
      <a target="_blank" href="http://matankb.github.io/"> Matan Kotler-Berkowitz</a>
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
      <a target="_blank" href="https://facebook.github.io/react/">React</a>
      <a target="_blank" href="http://redux.js.org/">Redux</a>
      <a target="_blank" href="https://github.com/reactjs/react-redux">React-Redux</a>
      <a target="_blank" href="http://www.material-ui.com/">Material UI</a>
      <a target="_blank" href="https://nodejs.org">NodeJS</a>
      <a target="_blank" href="https://webpack.github.io/">Webpack</a>
      <a target="_blank" href="https://babeljs.io/">Babel</a>
      <a target="_blank" href="http://lesscss.org/">Less</a>
      <a target="_blank" href="https://expressjs.com/">Express</a>
      <a target="_blank" href="http://passportjs.org/">Passport</a>
      <a target="_blank" href="https://www.mongodb.com/">MongoDB</a>
      <a target="_blank" href="http://mongoosejs.com/">Mongoose</a>
    </div>
  </div>
);
export default AboutText;
