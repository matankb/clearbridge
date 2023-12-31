import PropTypes from 'prop-types';

export default PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.element,
  }),
);
