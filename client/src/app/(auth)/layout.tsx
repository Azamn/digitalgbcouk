"use client";
import DataLoader from "@/components/shared/loader/data-laoder";
import { useAppSelector } from "@/store";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";

export default function RootAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthLoading } = useAppSelector((state) => state.global);
  if (isAuthLoading) return <DataLoader />;
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side - Image Section */}
      <div className="relative hidden lg:block">
        <Image
          src="/auth.png"
          alt="Authentication Background"
          layout="fill"
          objectFit="cover"
          className="dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>

      {/* Right Side - Authentication Form with Image Background */}
      <div className="relative flex h-screen w-full items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/Snow.svg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            priority
          />
        </div>
        {children}
      </div>
    </div>
  );
}
