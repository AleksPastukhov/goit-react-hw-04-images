import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Modal } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export function ModalWindow({ onCloseModal, children }) {
  useEffect(() => {
    const onEscPress = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onEscPress);

    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
  }, [onCloseModal]);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <Modal>{children}</Modal>
    </Overlay>,
    modalRoot
  );
}

ModalWindow.prototypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};
