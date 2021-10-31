import { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import Slider from "../slider";
import Constants from "../../lib/const";

interface CompProps {
  dimentions: any;
  updateBlurLevel: any;
  switchGreyScale: any;
  changeDimentions: any;
  isGreyScale: boolean;
  copyImageURLtoClip: any;
  range: number;
  downloadImage: any;
}

const EditorPanel = (props: CompProps) => {
  // let width = useRef();
  const width = useRef<any>(null);
  let height = useRef<any>(null);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    width.current.value = `${props.dimentions.width}`;
    height.current.value = `${props.dimentions.height}`;
  }, []);

  const updateSliderValue = (event: any) => {
    props.updateBlurLevel({ value: event.target.value });
  };

  const switchGreyScales = () => {
    props.switchGreyScale(!props.isGreyScale);
  };

  const changeImageDimentions = () => {
    props.changeDimentions({
      height: height.current.value,
      width: width.current.value,
    });
  };

  const shareUrl = () => {
    setAlert("Shareable link copied to clip");
    props.copyImageURLtoClip();
    setTimeout(() => {
      setAlert("");
    }, 4000);
  };

  return (
    <div className={Styles.slidecontainer}>
      <div className={Styles.editRow1}>
        <button className={Styles.button} onClick={switchGreyScales}>
          {props.isGreyScale
            ? Constants.imgTypes.color
            : Constants.imgTypes.greyScale}
        </button>
        <div className={Styles.rezierContainer}>
          <div className={Styles.inutcontaa}>
            <label>Width</label>
            <input
              className={Styles.size}
              ref={width}
              type="number"
              maxLength={4}
              defaultValue={props.dimentions.width}
            ></input>
          </div>
          <div className={Styles.inutcontaa}>
            <label>Height</label>
            <input
              className={Styles.size}
              ref={height}
              type="number"
              defaultValue={props.dimentions.height}
            ></input>
          </div>
          <button onClick={changeImageDimentions}>Resize</button>
        </div>
      </div>
      <div className={Styles.blurLevelindi}>
        Blur Level Set To {props.range} (Slide to change setting)
      </div>
      <Slider updateSliderValue={updateSliderValue} range={props.range} />
      <div className={Styles.actionContainer}>
        <div className={Styles.copiedMessage}>{alert}</div>
        <img
          alt="fallBack"
          onClick={shareUrl}
          className={Styles.action}
          src={Constants.icons.clip}
        />
        <img
          alt="fallBack"
          onClick={props.downloadImage}
          className={Styles.action}
          src={Constants.icons.download}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
