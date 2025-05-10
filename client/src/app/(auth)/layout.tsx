"use client";

import DataLoader from "@/components/shared/loader/data-laoder";
import useClearSessionOnNewTab from "@/hooks/use-clear-cookie";
import { useAppSelector } from "@/store";
import Image from "next/image";

export default function RootAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useClearSessionOnNewTab();
  const { isAuthLoading } = useAppSelector((state) => state.global);
  if (isAuthLoading) return <DataLoader />;

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {/* Full-Screen SVG Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/mountain.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
          priority
        />
      </div>

      {/* Responsive Grid */}
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Image Section */}
        <div className="hidden items-center justify-center lg:flex">
          <Image
            src="/auth.png"
            alt="Authentication Background"
            height={600}
            width={600}
            className="object-cover dark:brightness-[0.2]"
            priority
          />
        </div>

        {/* Right Side - Authentication Form */}
        <div className="flex items-center justify-center p-6">{children}</div>
      </div>
    </div>
  );
}
