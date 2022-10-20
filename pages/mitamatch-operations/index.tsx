import styles from "../../styles/Home.module.css";
import MitamaLab from "../../components/MitamaLab";
import MitamatchOperations from "../../contents/MitamatchOperations";

const Index: React.FC<{}> = () => {
  return (
    <div className={styles.container}>
      <MitamaLab>
        <MitamatchOperations />
      </MitamaLab>
    </div>
  );
};

export default Index;
