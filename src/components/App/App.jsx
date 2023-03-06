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
import { LoadMoreBtn } from '../Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [imagesData, setImagesData] = useState([]);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus(Status.PENDING);
    setIsButtonVisible(false);
    fetchGalleryImages(page, searchQuery)
      .then(imageSet => {
        setImagesData(prevState => [...prevState, ...imageSet.hits]);
        setStatus(Status.RESOLVED);
        setIsButtonVisible(true);
        setTotalHits(imageSet.totalHits);
      })
      .catch(() => {
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

  useEffect(() => {
    if (status !== Status.RESOLVED) {
      return;
    }

    if (totalHits > imagesData.length * page) {
      setStatus(Status.IDLE);
    }

    if (totalHits !== 0 && page === 1 && imagesData.length !== 0) {
      setStatus(Status.IDLE);
      toast.success(
        `Hooray!!! ${totalHits} images were found for your request.`
      );
    }

    if (imagesData.length === 0) {
      setStatus(Status.REJECTED);
      setIsButtonVisible(false);
      toast.error(
        `UpsOops!!! We did not find any images for this request. Try changing the query.`
      );
      return;
    }

    if (
      (totalHits < imagesData.length && page !== 1) ||
      (totalHits === imagesData.length && page !== 1)
    ) {
      setStatus(Status.REJECTED);
      setIsButtonVisible(false);
      toast.error(`Sorry we have nothing more to show you.`);
    }

    if (totalHits === imagesData.length && page === 1) {
      setStatus(Status.IDLE);
      setIsButtonVisible(false);
    }
  }, [totalHits, status, page, imagesData]);

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
        setSearchQuery={setSearchQuery}
        pageNumberUpdate={setPage}
        imagesDataUpdate={setImagesData}
        searchQuery={searchQuery}
        setIsButtonVisible={setIsButtonVisible}
      />
      <GallarySet imagesData={imagesData} page={page} />
      {isButtonVisible && (
        <LoadMoreBtn
          onLoadMoreBtnClick={() => {
            setPage(prevState => prevState + 1);
          }}
        />
      )}
      {status === Status.PENDING && <Loader />}
      <GlobalStyle />
    </Wrapper>
  );
}
