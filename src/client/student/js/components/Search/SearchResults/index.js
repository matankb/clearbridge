import React from 'react';

import ResultCard from './ResultCard';
import NoResults from './NoResults';

const SearchResults = ({ results, query, handleResultClick }) => {

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
      <h1>Search results for &quot;{ query }&quot;</h1>
      { searchCards.length ? searchCards : <NoResults />}
    </div>
  );
};

export default SearchResults;
