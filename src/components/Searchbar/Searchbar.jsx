import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchBar, SearchForm } from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';

export class SearchQueryField extends Component {
  state = {
    userSearchQuery: '',
  };

  onFormSabmit = e => {
    e.preventDefault();
    if (
      this.state.userSearchQuery.trim() !== '' &&
      this.props.searchQuery !== this.state.userSearchQuery
    ) {
      this.props.onSabmit(this.state.userSearchQuery);
      this.setState(() => ({
        userSearchQuery: '',
      }));
      this.props.isBtnDisabled(false);
    }
  };

  onInputValue = e => {
    const { value } = e.currentTarget;
    this.setState({ userSearchQuery: value });

    this.props.isBtnDisabled(true);
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.onFormSabmit}>
          <button>
            <BiSearchAlt />
          </button>

          <input
            onChange={this.onInputValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.userSearchQuery}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

SearchQueryField.prototypes = {
  onSabmit: PropTypes.func.isRequired,
  isBtnDisabled: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
