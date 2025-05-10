"use client";

import { Button } from "@/components/ui/button";
import useClearSessionOnNewTab from "@/hooks/use-clear-cookie";
import { Target } from "lucide-react";
import Image from "next/image";
import { Link } from 'next-view-transitions'

const Navbar = () => {
  return (
    <nav className="flex h-[70px] w-full border-dashed items-center border-2 justify-between border-b border-secondary px-8">
      <div className="inline-flex items-center">
        <Image
          src="https://www.digitalgb.co.uk/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.4ebfc4d4.png&w=2048&q=75"
          alt="DigitalGB Logo"
          width={190}
          height={90}
        />
      </div>
      <div className="inline-flex gap-x-2">
        <Link href="/sign-in">
          <Button
            className="w-[100px] border border-primary bg-secondary text-dark"
            variant="outline"
          >
            Log-in
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
