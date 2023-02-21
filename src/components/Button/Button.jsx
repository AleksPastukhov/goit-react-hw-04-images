import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export function LoadMoreBtn({ isBtnDisabled, onLoadMoreBtnClick }) {
  return (
    <Button type="button" disabled={isBtnDisabled} onClick={onLoadMoreBtnClick}>
      Load more
    </Button>
  );
}
LoadMoreBtn.prototypes = {
  onLoadMoreBtnClick: PropTypes.func.isRequired,
  isBtnDisabled: PropTypes.bool.isRequired,
};
