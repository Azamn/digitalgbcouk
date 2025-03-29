import React from "react";
import { PacmanLoader } from "react-spinners";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 13, color = "#ffffff" }) => {
  return <PacmanLoader size={size} color={color} />;
};

export default Spinner;
