import Image from "next/image";
import React, { ReactNode } from "react";

const lauout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative h-full flex w-full items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Snow.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
          priority
        />
      </div>
      <div className="center p-4">{children}</div>
    </div>
  );
};

export default lauout;
