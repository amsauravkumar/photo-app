import styles from "./styles.module.css";

interface CompProps {
  updateSliderValue: any;
  range: number;
}

const Slider = (props: CompProps) => {
  const { updateSliderValue, range } = props;
  return (
    <input
      onChange={updateSliderValue}
      type="range"
      min="1"
      max="10"
      value={range}
      className={styles.slider}
      id="myRange"
    />
  );
};

export default Slider;
