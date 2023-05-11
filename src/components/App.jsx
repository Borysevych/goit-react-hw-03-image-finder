import { Component } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { AppBlock } from './App.styled';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SelectedModalWindowImage } from './ImageGallery/ImageGallery.styled';
import { Button } from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api';
export class App extends Component {
  state = {
    showModal: false,
    searchValue: '',
    requestData: [],
    page: null,
    loading: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  onClickImg = largeURL => {
    this.toggleModal();
    this.setState({ largeModalImgURL: largeURL });
  };

  loadMore = () => {
    this.setState({ loading: true });
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  normalizeResponse = response => {
    const nornalizeData = response.data.hits.map(
      ({ webformatURL, id, largeImageURL }) => ({
        id: id,
        webURL: webformatURL,
        largeURL: largeImageURL,
      })
    );

    return nornalizeData;
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearchValue = prevState.searchValue;
    const nextSearchValue = this.state.searchValue;
    if (
      prevSearchValue !== nextSearchValue ||
      prevState.page !== this.state.page
    ) {
      try {
        const response = await axios.get('/', {
          params: {
            q: nextSearchValue,
            key: '31452049-9028b927189bb89bc78a16cd7',
            page: this.state.page,
            per_page: 12,
          },
        });

        if (!response.data.totalHits) {
          Notiflix.Notify.warning(`Нічого не знайдено, спробуйте ще`);
          return;
        }

        this.setState({ totalHits: response.data.totalHits });
        const data = this.normalizeResponse(response);
        this.setState(prevState => ({
          requestData: [...prevState.requestData, ...data],
        }));
      } catch (error) {
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  handleSubmitSearchBar = searchValue => {
    if (searchValue === '') {
      Notiflix.Notify.warning(`Ви не ввели жодного запиту`);
    }

    this.setState({
      searchValue: searchValue,
      requestData: [],
      page: 1,
      loading: true,
      showModal: false,
      totalHits: 0,
    });
  };

  render() {
    const { requestData, showModal, totalHits, page, loading } = this.state;

    return (
      <AppBlock>
        <Searchbar onSubmit={this.handleSubmitSearchBar} />
        {requestData.length > 0 && (
          <ImageGallery
            toggle={this.toggleModal}
            requestData={requestData}
            largeImageURL={this.onClickImg}
          />
        )}
        {loading && <Loader />}
        {totalHits > 12 * page && totalHits && !loading && (
          <Button onClick={this.loadMore}>Load More</Button>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <SelectedModalWindowImage
              src={this.state.largeModalImgURL}
              alt=""
            />
            <Button onClick={this.toggleModal}>Close</Button>
          </Modal>
        )}
      </AppBlock>
    );
  }
}

App.propTypes = {
  onSubmit: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
};