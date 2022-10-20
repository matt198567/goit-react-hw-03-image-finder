import { Component } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import { BASE_URL, API_KEY, SEARCH_PARAMS } from '../services/ImagesAPI';
import Searchbar from './Searchbar/Searchbar';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Modal from './Modal/Modal';
import SpinnerLoader from './Loader/Loader';

export class App extends Component {
  state = {
    hits: [],
    name: '',
    page: 1,
    showModal: false,
    loading: false,
    largeImageURL: '',
    tags: '',
    total: 0,
  };

  toggleModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      this.getValue();
    }
  }

  getValue = () => {
    // this.setState({ loading: true });
    axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${this.state.name}&page=${this.state.page}&${SEARCH_PARAMS}`
      )
      .then(response => {
        if (!response.data.hits.length) {
          Notiflix.Notify.failure('No images found!');
        } else {
          this.setState(state => ({
            hits: [...state.hits, ...response.data.hits],
            total: response.data.total,
          }));
        }
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ loading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onSubmit = value => {
    if (this.state.name !== value) {
      this.setState({
        page: 1,
        name: value,
        hits: [],
        isLoading: false,
        error: false,
      });
    }
  };

  render() {
    const { hits, showModal, loading, largeImageURL, tags, total } = this.state;

    return (
      <div>
        <Searchbar onSubmitHandler={this.onSubmit} />
        {hits && hits.length > 0 && (
          <ImageGallery>
            {this.state.hits.map(
              ({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                  onImage={this.toggleModal}
                />
              )
            )}
          </ImageGallery>
        )}
        {hits.length > 0 && !loading && hits.length < total && (
          <LoadMoreBtn onButtonClick={() => this.loadMore()} />
        )}

        {loading && <SpinnerLoader />}

        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
        )}
      </div>
    );
  }
}
