// import { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { SearchBar, SearchFofm } from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { object, string } from 'yup';

let userSchema = object({
  searchQueryField: string().required(),
});

export function SearchQueryField({
  onSubmit,
  setIsButtonVisible,
  searchQuery,
  pageNumberUpdate,
  imagesDataUpdate,
}) {
  const onFormSubmit = (value, action) => {
    const userSearchQuery = value.searchQueryField;
    console.dir(action);
    console.log(action.setFieldValue());
    if (userSearchQuery.trim() !== '' && searchQuery !== userSearchQuery) {
      onSubmit(userSearchQuery);
      pageNumberUpdate(1);
      setIsButtonVisible(true);
      imagesDataUpdate([]);
    }
    action.resetForm();
  };

  return (
    <SearchBar>
      <Formik
        initialValues={{ searchQueryField: '' }}
        validationSchema={userSchema}
        onSubmit={onFormSubmit}
      >
        <SearchFofm>
          <button type="submit" aria-label="Search button">
            <BiSearchAlt />
          </button>

          <Field
            type="text"
            name="searchQueryField"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="searchQueryField" component="div" />
        </SearchFofm>
      </Formik>
    </SearchBar>
  );
}

SearchQueryField.prototypes = {
  onSabmit: PropTypes.func.isRequired,
  setIsButtonVisible: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  pageNumberUpdate: PropTypes.func.isRequired,
  imagesDataUpdate: PropTypes.func.isRequired,
};
