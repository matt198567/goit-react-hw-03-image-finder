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
  };

  toggleModal = (imageURL, tag, id) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  componentDidUpdate(_, prevState) {
    // const { name } = this.state;
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
    }
  }

  getValue = ({ name, page }) => {
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${this.state.name}&page=${this.state.page}&${SEARCH_PARAMS}`
        )
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          } else if (name === this.state.name) {
            this.setState(state => ({
              hits: [...state.hits, ...response.data.hits],
              // name: name,
              // page: this.setState.page + 1,
            }));
          } else {
            this.setState(state => ({
              hits: response.data.hits,
              // name: name,
              // page: this.setState.page + 1,
            }));
          }
        });
    } catch (error) {
      console.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  // getValue = () => {
  //   this.setState({
  //     page: 1,
  //     name: '',
  //     hits: [],
  //     isLoading: false,
  //     error: false,
  //   });
  // };

  // loadMore = () => {
  //   this.setState(prevState => ({ page: prevState.page + 1 }));
  // };

  loadMore = () => {
    this.getValue(this.state);
  };

  render() {
    const { hits, showModal, loading, largeImageURL, tags } = this.state;

    return (
      <div>
        <Searchbar onSubmitHandler={this.getValue} />
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

        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
        )}

        {hits.length > 0 && (
          <LoadMoreBtn onButtonClick={() => this.loadMore()} />
        )}

        {loading && <SpinnerLoader />}
      </div>
    );
  }
}
