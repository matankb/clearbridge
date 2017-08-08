import React from 'react';

import ResultCard from './ResultCard';
import NoResults from './NoResults';

const SearchResults = ({ results, handleResultClick }) => {

  const searchCards = results.map(({ id, data, parts }) => (
    <ResultCard
      key={ id }
      snippet={ parts }
      name={ data.name }
      image={ data.image }
      color={ data.color }
      onClick={ () => handleResultClick(id) }
    />
  ));

  return (
    <div className="search-results">
      { searchCards.length ? searchCards : <NoResults />}
    </div>
  );
};

export default SearchResults;
