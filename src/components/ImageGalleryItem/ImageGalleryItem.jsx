import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem.styled';
import { ModalWindow } from '../Modal/Modal';

export function ImageItem({ webformatURL, tags, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ImageGalleryItem
        onClick={() => {
          setShowModal(prevState => !prevState);
        }}
      >
        <img src={webformatURL} alt={tags} />
      </ImageGalleryItem>
      {showModal && (
        <ModalWindow
          onCloseModal={() => {
            setShowModal(prevState => !prevState);
          }}
        >
          {<img src={largeImageURL} alt={tags} />}
        </ModalWindow>
      )}
    </>
  );
}

ImageItem.prototypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
