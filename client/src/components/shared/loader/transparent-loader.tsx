import React from "react";
import { HashLoader } from "react-spinners";

const TransParentLoader = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center opacityBg">
      <HashLoader className="text-dark" size={60} speedMultiplier={1} />
    </div>
  );
};

export default TransParentLoader;
