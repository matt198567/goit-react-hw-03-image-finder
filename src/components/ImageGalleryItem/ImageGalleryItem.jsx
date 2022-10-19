import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, largeImageURL, tags, id, onImage }) {
  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt="response from API"
          className={styles.ImageGalleryItemImage}
          onClick={() => onImage(largeImageURL, tags, id)}
        />
      </li>
    </>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onImage: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
