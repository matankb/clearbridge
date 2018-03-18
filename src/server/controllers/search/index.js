const { fork } = require('child_process');
const path = require('path');

const uuid = require('uuid/v4');

const { REQ_SEARCH, RECV_SEARCH, RECV_SEARCH_ERR } = require('./commands');

const { Student } = require('../../models/User');
require('../../models/Topic');

class SearchWorker {
  constructor() {
    this._pendingSearches = new Map();
    this._spawnWorker();
  }

  dispatchSearch(topics, query) {
    const id = uuid();

    let resolve;
    let reject;
    const ret = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    this._pendingSearches.set(id, { resolve, reject });
    this._child.send({
      cmd: REQ_SEARCH,
      data: {
        id,
        topics,
        query,
      },
    });

    return ret;
  }

  _spawnWorker() {
    this._child = fork(path.resolve(__dirname, './worker'));
    this._child.on('message', msg => this._handleWorkerMessage(msg));
    this._child.on('exit', code => this._handleWorkerExit(code));
  }

  _handleWorkerMessage(msg) {
    const { cmd, data } = msg;

    if (cmd === RECV_SEARCH) {
      this._pendingSearches.get(data.id).resolve(data.results);
    } else if (cmd === RECV_SEARCH_ERR) {
      const err = new Error(data.err.message);
      err.stack = data.err.stack;

      this._pendingSearches.get(data.id).reject(err);
    }
    this._pendingSearches.delete(data.id);
  }

  _handleWorkerExit(code) {
    console.log('Search worker died. Restarting...'); // eslint-disable-line no-console
    if (code !== 0) {
      for (const [, { reject }] of this._pendingSearches) {
        reject(new Error('Search worker died'));
      }

      this._pendingSearches.clear();
      this._spawnWorker();
    }
  }
}

const mainWorker = new SearchWorker();

// CONTROLLER
exports.search = async (req, res) => {
  const { topics } = await Student.findById(req.user.id).populate('topics').exec();
  res.json(await mainWorker.dispatchSearch(topics, req.query.q));
};
