import Styles from "./styles.module.css";
import EditorPanel from "../editorPanel";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import MagnifierModal from "../magnifierModal";
import DisplayMessage from "../displayMessage";
import Constants from "../../lib/const";

interface Dimentions {
  height: number;
  width: number;
}
interface CompProps {
  imageurl: string;
  isGreyScale: boolean;
}

const ImageModal = (props: CompProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [range, setRange] = useState(1);
  const [isGreyScale, setIsGreyScale] = useState(false);
  const [dismentions, setdimentions] = useState<Dimentions>({
    height: 0,
    width: 0,
  });
  const [initialload, setinitialLoad] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  let baseUrl = useRef("");

  useEffect(() => {
    setImageUrl(props.imageurl);
    setIsGreyScale(props.isGreyScale);
    let pathArray = props.imageurl.split("/");
    setdimentions({
      height: JSON.parse(pathArray[pathArray.length - 1]),
      width: JSON.parse(pathArray[pathArray.length - 2]),
    });
    pathArray.splice(pathArray.length - 2, 2);
    baseUrl.current = pathArray.join("/");
    setinitialLoad(true);
  }, []);

  useEffect(() => {
    updateImageUrl();
  }, [range, isGreyScale, dismentions]);

  const updateBlurLevel = ({ value }: any) => {
    setRange(value);
  };

  const switchGreyScale = async () => {
    setIsGreyScale(!isGreyScale);
  };

  const changeDimentions = ({ width, height }: Dimentions) => {
    setdimentions({
      height,
      width,
    });
  };

  const updateImageUrl = () => {
    console.log(
      "Loading Image URL-------",
      `${baseUrl.current}/${dismentions.width}/${
        dismentions.height
      }?blur=${range}${isGreyScale ? "&grayscale" : ""}`
    );
    setImageUrl(
      `${baseUrl.current}/${dismentions.width}/${
        dismentions.height
      }?blur=${range}${isGreyScale ? "&grayscale" : ""}`
    );
  };

  const downloadImage = async () => {
    const image = await fetch(imageUrl);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyImageURLtoClip = () => {
    navigator.clipboard.writeText(imageUrl);
  };

  const updateImageLoadStatus = ({ updatedStatus }: any) => {
    setImageLoadError(updatedStatus);
  };

  return (
    <div className={Styles.container}>
      {initialload && (
        <React.Fragment>
          <div className={Styles.imgContainer}>
            {(isMobile && (
              <img
                src={imageUrl}
                alt="fallBack"
                className={`${
                  Styles[`image-${imageLoaded ? "visible" : "hidden"}`]
                } ${Styles.image}`}
                onLoad={() => {
                  setImageLoaded(true);
                }}
              />
            )) || (
              <MagnifierModal
                imageURL={imageUrl}
                updateImageLoadStatus={updateImageLoadStatus}
              />
            )}
            {imageLoadError && (
              <DisplayMessage
                isError={true}
                message={Constants.displayMsg.imageLoadError}
              />
            )}
            {!isMobile && (
              <DisplayMessage
                isError={false}
                message={Constants.displayMsg.hover}
              />
            )}
          </div>
          <div>
            <EditorPanel
              updateBlurLevel={updateBlurLevel}
              switchGreyScale={switchGreyScale}
              changeDimentions={changeDimentions}
              range={range}
              dimentions={dismentions}
              isGreyScale={isGreyScale}
              downloadImage={downloadImage}
              copyImageURLtoClip={copyImageURLtoClip}
            ></EditorPanel>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ImageModal;
