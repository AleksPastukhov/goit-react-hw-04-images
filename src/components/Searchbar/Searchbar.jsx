import { Formik, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { SearchBar, SearchFofm } from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { object, string } from 'yup';

let userSchema = object({
  searchQueryField: string().required(),
});

export function SearchQueryField({
  onSabmit,
  setIsButtonVisible,
  searchQuery,
  pageNumberUpdate,
  imagesDataUpdate,
}) {
  const onFormSabmit = (value, { resetForm }) => {
    const userSearchQuery = value.searchQueryField;
    if (userSearchQuery.trim() !== '' && searchQuery !== userSearchQuery) {
      onSabmit(userSearchQuery);
      pageNumberUpdate(1);
      setIsButtonVisible(true);
      imagesDataUpdate([]);
    }

    resetForm();
  };

  return (
    <SearchBar>
      <Formik
        initialValues={{ searchQueryField: '' }}
        validationSchema={userSchema}
        onSubmit={onFormSabmit}
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
