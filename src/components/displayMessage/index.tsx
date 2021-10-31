import React from "react";
import styles from "./styles.module.css";
interface CompProps {
  message: string;
  isError: boolean;
}

const DisplayMessage = (props: CompProps) => {
  const { isError, message } = props;
  return (
    <div className={`${styles[isError ? "errorMsg" : ""]}`}>{message}</div>
  );
};

export default React.memo(DisplayMessage);
