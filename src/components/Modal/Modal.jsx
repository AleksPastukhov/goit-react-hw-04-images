import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
  }

  onEscPress = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <Modal>{this.props.children}</Modal>
      </Overlay>,
      modalRoot
    );
  }
}
