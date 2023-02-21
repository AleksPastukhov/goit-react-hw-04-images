import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import { ImageItem } from '../ImageGalleryItem/ImageGalleryItem';
import { fetchGalleryImages } from '../../services/pixabay-api';
import { LoadMoreBtn } from '../Button/Button';
import { Loader } from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class GallarySet extends Component {
  state = {
    page: 1,
    status: Status.IDLE,
    error: null,
    imagesData: [],
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState(() => ({
        imagesData: [],
        page: 1,
        status: Status.PENDING,
      }));

      fetchGalleryImages(1, nextQuery)
        .then(imageSet => {
          this.setState({
            imagesData: imageSet.hits,
            page: this.state.page + 1,
            status: Status.RESOLVED,
            totalHits: imageSet.totalHits,
          });
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
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  onCurrentCardClick = event => {
    if (event.currentTarget !== event.target) {
      const currentCard = this.state.imagesData.filter(
        ({ webformatURL }) => webformatURL === event.target.currentSrc
      );
      const currentUrlForModal = currentCard[0].largeImageURL;
      const currentTags = currentCard[0].tags;
      this.props.onCardClick(currentUrlForModal, currentTags);
      this.props.onOpenModal();
    }
  };

  onLoadMoreBtnClick = () => {
    const query = this.props.searchQuery;
    const pageNumber = this.state.page;

    this.setState(() => ({
      status: Status.PENDING,
    }));

    fetchGalleryImages(pageNumber, query)
      .then(imageSet => {
        this.setState({
          imagesData: [...this.state.imagesData, ...imageSet.hits],
          page: this.state.page + 1,
          status: Status.RESOLVED,
        });
        if (
          imageSet.totalHits === this.state.imagesData.length ||
          imageSet.totalHits <
            this.state.imagesData.length + imageSet.hits.length
        ) {
          toast.error(`Sorry we have nothing more to show you.`);
        }
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  render() {
    const { status, imagesData, totalHits } = this.state;

    return (
      <>
        <ImageGallery onClick={this.onCurrentCardClick}>
          {imagesData.map(({ id, webformatURL, tags }) => {
            return (
              <ImageItem key={id} webformatURL={webformatURL} tags={tags} />
            );
          })}
        </ImageGallery>
        {!this.props.isBtnDisabled &&
          status !== 'pending' &&
          status !== 'idle' &&
          imagesData.length !== totalHits &&
          imagesData.length < totalHits && (
            <LoadMoreBtn
              isBtnDisabled={this.props.isBtnDisabled}
              onLoadMoreBtnClick={this.onLoadMoreBtnClick}
            />
          )}
        {status === 'pending' && <Loader />}
      </>
    );
  }
}

GallarySet.prototypes = {
  onCardClick: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
};
