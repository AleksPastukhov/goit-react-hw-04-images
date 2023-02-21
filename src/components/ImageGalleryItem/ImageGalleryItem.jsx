import { ImageGalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function ImageItem({ webformatURL, tags }) {
  return (
    <ImageGalleryItem>
      <img src={webformatURL} alt={tags} />
    </ImageGalleryItem>
  );
}

ImageItem.prototypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};
