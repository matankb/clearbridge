import React from 'react';
import PropTypes from 'prop-types';

import ResultCard from './ResultCard';
import NoResults from './NoResults';

const SearchResults = ({ results }) => {

  const searchCards = results.map(({ id, data, parts }) => (
    <ResultCard
      key={ id }
      id={ id }
      snippet={ parts }
      name={ data.name }
      image={ data.image }
      color={ data.color }
      external={ data.external }
      externalLink={ data.externalLink }
    />
  ));

  return (
    <div className="search-results">
      { searchCards.length ? searchCards : <NoResults />}
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
};

export default SearchResults;
