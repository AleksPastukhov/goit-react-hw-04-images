import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery.styled';
import { ImageItem } from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from '../Button/Button';

export function GallarySet({ isBtnDisabled, onLoadMoreBtnClick, imagesData }) {
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
      {isBtnDisabled && (
        <LoadMoreBtn
          disabled={isBtnDisabled}
          onLoadMoreBtnClick={onLoadMoreBtnClick}
        />
      )}
    </>
  );
}

GallarySet.prototypes = {
  isBtnDisabled: PropTypes.bool.isRequired,
  onLoadMoreBtnClick: PropTypes.func.isRequired,
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
