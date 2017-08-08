import React from 'react';

import ResultCard from './ResultCard';
import NoResults from './NoResults';

const SearchResults = ({ results, handleResultClick }) => {

  const searchCards = results.map(({ id, data, parts }) => (
    <ResultCard
      key={ id }
      id={ id }
      snippet={ parts }
      name={ data.name }
      image={ data.image }
      color={ data.color }
    />
  ));

  return (
    <div className="search-results">
      { searchCards.length ? searchCards : <NoResults />}
    </div>
  );
};

export default SearchResults;
