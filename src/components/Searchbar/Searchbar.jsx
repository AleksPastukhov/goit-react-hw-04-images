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
  const handleSubmit = e => {
    if (e.queryField.trim() !== '' && searchQuery !== e.queryField) {
      setSearchQuery(e.queryField);
      pageNumberUpdate(1);
      setIsButtonVisible(true);
      imagesDataUpdate([]);
    }
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
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
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
