import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery.styled';
import { ImageItem } from '../ImageGalleryItem/ImageGalleryItem';

export function GallarySet({ imagesData }) {
  return (
    <>
      <ImageGallery>
        {imagesData.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          );
        })}
      </ImageGallery>
    </>
  );
}

GallarySet.prototypes = {
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
