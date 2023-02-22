import { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchBar, SearchForm } from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';

export function SearchQueryField({ onSabmit, isBtnDisabled, searchQuery }) {
  const [userSearchQuery, setUserSearchQuery] = useState('');

  const onFormSabmit = e => {
    e.preventDefault();
    if (userSearchQuery.trim() !== '' && searchQuery !== userSearchQuery) {
      onSabmit(userSearchQuery);
      setUserSearchQuery('');
      isBtnDisabled(false);
    }
  };

  const onInputValue = e => {
    setUserSearchQuery(e.currentTarget.value);
    isBtnDisabled(true);
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={onFormSabmit}>
        <button aria-label="Search button">
          <BiSearchAlt />
        </button>

        <input
          onChange={onInputValue}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={userSearchQuery}
        />
      </SearchForm>
    </SearchBar>
  );
}

SearchQueryField.prototypes = {
  onSabmit: PropTypes.func.isRequired,
  isBtnDisabled: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
