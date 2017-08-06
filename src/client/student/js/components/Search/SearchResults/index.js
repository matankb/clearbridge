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
    <div>
      Search results for { query }
      { searchCards.length ? searchCards : <NoResults />}
    </div>
  );
};

export default SearchResults;
