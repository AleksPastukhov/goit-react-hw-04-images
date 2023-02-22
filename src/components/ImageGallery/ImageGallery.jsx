import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { fetchGalleryImages } from '../../services/pixabay-api';
import { ImageGallery } from './ImageGallery.styled';
import { ImageItem } from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from '../Button/Button';
import { Loader } from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function GallarySet({ searchQuery, isBtnDisabled }) {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [imagesData, setImagesData] = useState([]);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (searchQuery !== '') {
      setImagesData([]);
      setPage(1);
      setStatus(Status.PENDING);

      fetchGalleryImages(1, searchQuery)
        .then(imageSet => {
          setImagesData(imageSet.hits);
          setPage(prevState => prevState + 1);
          setStatus(Status.RESOLVED);
          setTotalHits(imageSet.totalHits);
          if (imageSet.totalHits !== 0) {
            toast.success(
              `Hooray!!! ${imageSet.totalHits} images were found for your request.`
            );
          }
          if (imageSet.totalHits === 0) {
            toast.error(
              `UpsOops!!! We did not find any images for this request. Try changing the query.`
            );
          }
        })
        .catch(() => {
          setStatus(Status.REJECTED);
        });
    }
  }, [searchQuery]);

  const onLoadMoreBtnClick = () => {
    setStatus(Status.PENDING);

    fetchGalleryImages(page, searchQuery)
      .then(imageSet => {
        setImagesData(prevState => [...prevState, ...imageSet.hits]);
        setPage(prevState => prevState + 1);
        setStatus(Status.RESOLVED);
        if (
          imageSet.totalHits === imagesData.length ||
          imageSet.totalHits < imagesData.length + imageSet.hits.length
        ) {
          toast.error(`Sorry we have nothing more to show you.`);
        }
      })
      .catch(() => {
        setStatus(Status.REJECTED);
      });
  };

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
      {!isBtnDisabled &&
        status !== 'pending' &&
        status !== 'idle' &&
        imagesData.length !== totalHits &&
        imagesData.length < totalHits && (
          <LoadMoreBtn
            isBtnDisabled={isBtnDisabled}
            onLoadMoreBtnClick={onLoadMoreBtnClick}
          />
        )}
      {status === 'pending' && <Loader />}
    </>
  );
}

GallarySet.prototypes = {
  searchQuery: PropTypes.string.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
};
