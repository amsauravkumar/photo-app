import ReactImageMagnify from "react-image-magnify";
import styles from "./styles.module.css";

interface CompProps {
  imageURL: string;
  updateImageLoadStatus: any;
}
const MagnifierModal = (props: CompProps) => {
  const { imageURL, updateImageLoadStatus } = props;
  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: "ImageBackDrop",
          isFluidWidth: true,
          src: imageURL,
          onError: () => {
            updateImageLoadStatus({ updatedStatus: true });
          },
          onLoad: () => {
            updateImageLoadStatus({ updatedStatus: false });
          },
        },
        largeImage: {
          src: imageURL,
          width: 1200,
          height: 1800,
        },
        className: `${styles.imageContainer}`,
        enlargedImageContainerClassName: `${styles.enlargedImageContainer}`,
        imageClassName: `${styles.image}`,
        onError: () => {
          updateImageLoadStatus(true);
        },
        onLoad: () => {
          updateImageLoadStatus(false);
        },
      }}
    />
  );
};

export default MagnifierModal;
