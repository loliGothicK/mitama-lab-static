import type { NextPage } from 'next';
import MitamaLab from '../components/MitamaLab';
import { default as MitamaLabHome } from '../contents/Home';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <MitamaLab>
        <MitamaLabHome />
      </MitamaLab>
    </div>
  );
};

export default Home;
