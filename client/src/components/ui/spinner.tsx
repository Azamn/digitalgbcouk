import React from "react";
import { ClipLoader, MoonLoader } from "react-spinners";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 23, color = "#000000" }) => {
  return <ClipLoader size={size} color={color} />;
};

export default Spinner;
