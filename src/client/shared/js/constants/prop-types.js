import PropTypes from 'prop-types';

const topic = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.string,
});

const error = PropTypes.shape({
  status: PropTypes.number,
  offline: PropTypes.bool,
});

export default {
  topic,
  error,
};
