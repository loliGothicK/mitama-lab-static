import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import MitamaLab from "../components/MitamaLab";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <MitamaLab />
    </div>
  );
};

export default Home;
