import React from "react";
import { HashLoader } from "react-spinners";

const TransparentLoader = () => {
  return (
    <div className="bg-black/50 flex min-h-screen w-full items-center justify-center">
      <HashLoader color="#ffffff" size={60} speedMultiplier={1} />
    </div>
  );
};

export default TransparentLoader;
