const { REQ_SEARCH, RECV_SEARCH, RECV_SEARCH_ERR } = require('./commands');
const { doSearch } = require('./algo');

process.on('message', msg => {
  const { cmd, data } = msg;

  if (cmd === REQ_SEARCH) {
    try {
      const searchResults = doSearch(data.topics, data.query);
      process.send({
        cmd: RECV_SEARCH,
        data: {
          id: data.id,
          results: searchResults,
        },
      });
    } catch (err) {
      process.send({
        cmd: RECV_SEARCH_ERR,
        data: {
          id: data.id,
          err: {
            message: err.message,
            stack: err.stack,
          },
        },
      });
    }
  }
});
