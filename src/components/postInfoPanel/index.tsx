import styles from "./styles.module.css";
import Constants from "../../lib/const";

interface CompProps {
  author: string;
  isGreyScale: boolean;
  switchImageMode: any;
}

const PostInfoPanel = (props: CompProps) => {
  const { author, isGreyScale, switchImageMode } = props;
  return (
    <div className={styles.panelContainer}>
      <div className={styles.authorDetails}>
        <span className={styles.authorTitle}>Author: </span> {author}
      </div>
      <div className={styles.switchImageMode}>
        <div className={styles.modeType}>
          Image in{" "}
          {isGreyScale
            ? Constants.imgTypes.greyScale
            : Constants.imgTypes.color}{" "}
          Mode
        </div>
        <button onClick={() => switchImageMode()}>
          {isGreyScale
            ? Constants.imgTypes.color
            : Constants.imgTypes.greyScale}
        </button>
      </div>
    </div>
  );
};

export default PostInfoPanel;
