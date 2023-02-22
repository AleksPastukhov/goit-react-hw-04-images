import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export function LoadMoreBtn({ onLoadMoreBtnClick }) {
  return (
    <Button type="button" onClick={onLoadMoreBtnClick}>
      Load more
    </Button>
  );
}
LoadMoreBtn.prototypes = {
  onLoadMoreBtnClick: PropTypes.func.isRequired,
};
