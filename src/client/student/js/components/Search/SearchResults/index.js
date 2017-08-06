import React from 'react';

import ResultCard from './ResultCard';
import NoResults from './NoResults';

const SearchResults = ({ results, query }) => {

  const searchCards = results.map(({ id, data }) => (
    <ResultCard
      key={ id }
      name={ data.name }
      image={ data.image }
      color={ data.color }
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
