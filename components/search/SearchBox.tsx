import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase } from '@mui/material';
import React from 'react';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox: React.FC<SearchBoxProvided> = ({ refine, currentRefinement }) => {
  return (
    <div>
      <div>
        <SearchIcon />
        <InputBase
          placeholder="Search messages"
          value={currentRefinement}
          onChange={e => {
            refine(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default connectSearchBox(SearchBox);
