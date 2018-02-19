const Ask = require('../models/Ask');
const Topic = require('../models/Topic');

const { unauthenticated } = require('../helpers/res-message');

exports.getAsks = async (req, res) => {
  const asks = await Ask.find()
    .populate('topic', 'name color')
    .populate('asker', 'name')
    .lean() // plain array of objects, to allow .map
    .exec()
    .map(ask => { // remove name from unnamed asks
      if (!ask.named) {
        return {
          ...ask,
          asker: {
            ...ask.asker,
            name: null, // client will interpret as unnanmed
          },
        };
      }
      return ask;
    });

  res.json(asks);

};

exports.createAsk = async (req, res) => {

  // ensure that ask is empty - this is validated client-side as well
  if (req.body.data.question === '') {
    // middleware will set status to 500 and return this error
    throw new Error('Ask must contain non-empty question');
  }

  const ask = new Ask();
  const topic = await Topic.findById(req.body.data.topic);

  ask.asker = req.user.id;
  Object.assign(ask, req.body.data);
  topic.asks.push(ask.id);
  await topic.save();
  res.json(await ask.save());
};

exports.updateAsk = async (req, res, next) => {
  const ask = await Ask.findById(req.params.id).exec();
  if (!ask) {
    return next();
  }

  if (req.user.type === 0) {
    if (!ask.asker.equals(req.user.id)) {
      return unauthenticated(res); // forbid student who isn't asker from updating ask
    } else {
      // only allow students to update certain fields
      ask.question = req.body.data.question;
      ask.private = req.body.data.private;
      ask.named = req.body.data.named;
    }
  } else {
    // merge existing model with new data
    Object.assign(ask, req.body.data);
  }

  res.json(await ask.save());
};

exports.deleteAsk = async (req, res, next) => {

  // forbid student who isn't asker from deleting ask
  const ask = await Ask.findById(req.params.id);
  if (req.user.type === 0 && !ask.asker.equals(req.user.id)) {
    return unauthenticated(res);
  }

  const deletedAsk = await Ask.findByIdAndRemove(req.params.id).exec();
  if (!deletedAsk) { // ask did not exist
    next();
  } else {
    res.json({});
  }

};
