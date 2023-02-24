import { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { SearchBar, SearchFofm } from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { object, string } from 'yup';

let userSchema = object({
  queryField: string(),
});

export function SearchQueryField({
  setSearchQuery,
  setIsButtonVisible,
  searchQuery,
  pageNumberUpdate,
  imagesDataUpdate,
}) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    if (inputValue.trim() !== '' && searchQuery !== inputValue) {
      setSearchQuery(inputValue);
      pageNumberUpdate(1);
      setIsButtonVisible(true);
      imagesDataUpdate([]);
      setInputValue('');
    }
  };

  const handleChange = e => {
    setInputValue(e.currentTarget.value);
    setIsButtonVisible(false);
  };

  return (
    <SearchBar>
      <Formik
        initialValues={{ queryField: '' }}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <SearchFofm>
          <button type="submit" aria-label="Search button">
            <BiSearchAlt />
          </button>

          <Field
            type="text"
            name="queryField"
            value={inputValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
            onChange={handleChange}
          />
          <ErrorMessage name="queryField" component="div" />
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
