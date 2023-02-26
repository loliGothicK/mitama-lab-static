import type { NextPage } from 'next';

import MitamaLab from '../layouts/MitamaLab';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <MitamaLab>{'Hello!'}</MitamaLab>
    </div>
  );
};

export default Home;
