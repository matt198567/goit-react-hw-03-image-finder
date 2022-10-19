import { Dna } from 'react-loader-spinner';
import styles from './Loader.module.css';
const SpinnerLoader = () => {
  return (
    <div className={styles.Dna}>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default SpinnerLoader;
