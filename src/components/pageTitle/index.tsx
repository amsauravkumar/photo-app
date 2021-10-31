import styles from "./styles.module.css";
import Constants from "../../lib/const";

const PageTitle = () => {
  return (
    <div className={styles.title}>
      <h1>{Constants.displayMsg.pageTitle}</h1>
    </div>
  );
};

export default PageTitle;
