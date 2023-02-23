import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchGalleryImages } from '../../services/pixabay-api';
import GlobalStyle from '../GlobalStyle';
import { toast } from 'react-toastify';
import { GallarySet } from '../ImageGallery/ImageGallery';
import { SearchQueryField } from '../Searchbar/Searchbar';
import { Wrapper } from './App.styled';
import { Loader } from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [imagesData, setImagesData] = useState([]);

  useEffect(() => {
    if (searchQuery !== '') {
      setStatus(Status.PENDING);
      setButtonDisabled(false);
      fetchGalleryImages(page, searchQuery)
        .then(imageSet => {
          setImagesData(prevState => [...prevState, ...imageSet.hits]);
          setStatus(Status.RESOLVED);
          setButtonDisabled(true);
          showMessage(imageSet, page);
        })
        .catch(() => {
          setStatus(Status.REJECTED);
        });
    }
  }, [searchQuery, page]);

  function showMessage(data, page) {
    if (data.totalHits !== 0 && page === 1) {
      toast.success(
        `Hooray!!! ${data.totalHits} images were found for your request.`
      );
    }
    if (data.totalHits === 0) {
      setButtonDisabled(false);
      toast.error(
        `UpsOops!!! We did not find any images for this request. Try changing the query.`
      );
    }
    if (
      data.totalHits / data.hits.length < page ||
      (data.totalHits === data.hits.length * page && page !== 1)
    ) {
      setButtonDisabled(false);
      toast.error(`Sorry we have nothing more to show you.`);
    }
    if (data.totalHits === data.hits.length && page === 1) {
      setButtonDisabled(false);
    }
  }

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
        onSabmit={setSearchQuery}
        pageNumberUpdate={setPage}
        imagesDataUpdate={setImagesData}
        searchQuery={searchQuery}
        isBtnDisabled={setButtonDisabled}
      />
      <GallarySet
        status={status}
        imagesData={imagesData}
        searchQuery={searchQuery}
        isBtnDisabled={buttonDisabled}
        onLoadMoreBtnClick={() => {
          setPage(prevState => prevState + 1);
        }}
        page={page}
      />
      {status === 'pending' && <Loader />}
      <GlobalStyle />
    </Wrapper>
  );
}
