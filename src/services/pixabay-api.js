import axios from 'axios';
import PropTypes from 'prop-types';

export const fetchGalleryImages = async (nextStatePage, nextName) => {
  const BASE_URL = 'https://pixabay.com/api/';

  const params = {
    key: '32681971-7c4dedd5870704d3ef280ea2e',
    q: `${nextName}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: `${nextStatePage}`,
    per_page: '12',
  };
  const resolve = await axios(BASE_URL, { params });

  return resolve.data;
};

fetchGalleryImages.prototypes = {
  nextStatePage: PropTypes.number.isRequired,
  nextName: PropTypes.string.isRequired,
};
