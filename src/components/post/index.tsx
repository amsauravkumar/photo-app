import React from "react";
import { useEffect, useState } from "react";
import styles from "./post.module.css";
import PostInfoPanel from "../postInfoPanel";

interface PostProps {
  postData: any;
  onClick: any;
}

const Post = (props: PostProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isGreyScale, setIsGreyScale] = useState(false);

  const {
    postData: { download_url, author },
  } = props;

  useEffect(() => {
    setImageUrl(download_url);
  }, []);

  const switchImageMode = () => {
    setImageLoaded(false);
    setIsGreyScale(!isGreyScale);
  };

  useEffect(() => {
    setImageUrl(isGreyScale ? `${download_url}?grayscale` : `${download_url}`);
  }, [isGreyScale]);

  return (
    <div className={styles.card}>
      <div>
        <div
          className={styles.imgContainer}
          onClick={() => props.onClick({ download_url, isGreyScale })}
        >
          <img
            src={imageUrl}
            alt="fallBack"
            className={`${
              styles[`image-${imageLoaded ? "visible" : "hidden"}`]
            } ${styles.smoothimage}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
      <PostInfoPanel
        author={author}
        isGreyScale={isGreyScale}
        switchImageMode={switchImageMode}
      />
    </div>
  );
};

export default Post;
