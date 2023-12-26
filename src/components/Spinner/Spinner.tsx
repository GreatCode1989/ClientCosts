import { ISpinnerProps } from "../../types";
import "./styles.css";

export const Spinner = ({ top, left }: ISpinnerProps) => {
  return (
    <div
      style={{ top: `${top}px`, left: `${left}px` }}
      className="spinner-border main-spinner"
      role="status"
    />
  );
};
