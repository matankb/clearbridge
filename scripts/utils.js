/* eslint-disable no-console */

const readline = require('mz/readline');
const mongoose = require('mongoose');

const config = require('../src/server/config');

let rl;

exports.configureReadline = () => {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

exports.connectToMongo = () => {
  mongoose.connect(config.db.URL);
};

exports.question = async (prompt, allowedInput = []) => {
  if (allowedInput.length) {
    prompt = `${prompt} (${allowedInput.join('/')}): `;
    let response;
    do {
      response = await rl.question(prompt);
    } while (!allowedInput.includes(response));
    return response;
  } else {
    prompt = `${prompt}: `;
    return rl.question(prompt);
  }
};

exports.wrapAsync = fn => (...args) => {
  fn(...args)
    .then(process.exit)
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
};
