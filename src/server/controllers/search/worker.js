const { REQ_SEARCH, RECV_SEARCH } = require('./commands');
const { doSearch } = require('./algo');

process.on('message', msg => {
  if (msg.cmd === REQ_SEARCH) {
    const { data } = msg;

    process.send({
      cmd: RECV_SEARCH,
      data: {
        id: data.id,
        results: doSearch(data.topics, data.query),
      },
    });
  }
});
