import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from '../GlobalStyle';
import { GallarySet } from '../ImageGallery/ImageGallery';
import { SearchQueryField } from '../Searchbar/Searchbar';
import { Wrapper } from './App.styled';

export function App() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
        searchQuery={searchQuery}
        isBtnDisabled={setButtonDisabled}
      />
      <GallarySet searchQuery={searchQuery} isBtnDisabled={buttonDisabled} />
      <GlobalStyle />
    </Wrapper>
  );
}
