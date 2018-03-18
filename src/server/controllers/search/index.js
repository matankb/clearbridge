const { fork } = require('child_process');
const path = require('path');

const uuid = require('uuid/v4');

const { REQ_SEARCH, RECV_SEARCH, RECV_SEARCH_ERR } = require('./commands');

const { Student } = require('../../models/User');
require('../../models/Topic');

class SearchWorker {
  constructor() {
    this.pendingSearches = new Map();
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

    this.pendingSearches.set(id, { resolve, reject });
    this.child.send({
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
    this.child = fork(path.resolve(__dirname, './worker'));
    this.child.on('message', msg => this._handleWorkerMessage(msg));
  }

  _handleWorkerMessage(msg) {
    const { cmd, data } = msg;

    if (cmd === RECV_SEARCH) {
      this.pendingSearches.get(data.id).resolve(data.results);
    } else if (cmd === RECV_SEARCH_ERR) {
      const err = new Error(data.err.message);
      err.stack = data.err.stack;

      this.pendingSearches.get(data.id).reject(err);
    }
    this.pendingSearches.delete(data.id);
  }
}

const mainWorker = new SearchWorker();

// CONTROLLER
exports.search = async (req, res) => {
  const { topics } = await Student.findById(req.user.id).populate('topics').exec();
  res.json(await mainWorker.dispatchSearch(topics, req.query.q));
};
