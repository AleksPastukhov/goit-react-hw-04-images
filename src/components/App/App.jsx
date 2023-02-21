import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from '../GlobalStyle';
import { GallarySet } from '../ImageGallery/ImageGallery';
import { ModalWindow } from '../Modal/Modal';
import { SearchQueryField } from '../Searchbar/Searchbar';
import { Wrapper } from './App.styled';

export class App extends Component {
  state = {
    showModal: false,
    buttonDisabled: true,
    imageURL: '',
    tags: '',
    searchQuery: '',
  };

  isBtnDisabled = bul => {
    this.setState(() => ({
      buttonDisabled: bul,
    }));
  };

  onSabmit = query => {
    if (query) {
      this.setState(() => ({
        searchQuery: query,
      }));
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onCardClick = (url, tags) => {
    if (url) {
      this.setState(() => ({
        imageURL: url,
      }));
    }
    if (tags) {
      this.setState(() => ({
        tags,
      }));
    }
  };

  render() {
    const { showModal, searchQuery, buttonDisabled, imageURL, tags } =
      this.state;

    return (
      <Wrapper>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <SearchQueryField
          onSabmit={this.onSabmit}
          searchQuery={searchQuery}
          isBtnDisabled={this.isBtnDisabled}
        />
        <GallarySet
          onCardClick={this.onCardClick}
          onOpenModal={this.toggleModal}
          searchQuery={searchQuery}
          isBtnDisabled={buttonDisabled}
        />
        {showModal && (
          <ModalWindow onCloseModal={this.toggleModal}>
            {<img src={imageURL} alt={tags} />}
          </ModalWindow>
        )}

        <GlobalStyle />
      </Wrapper>
    );
  }
}
