"use client";
import { Button } from "@/components/ui/button";
import useClearSessionOnNewTab from "@/hooks/use-clear-cookie";
import { Target } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  useClearSessionOnNewTab();
  return (
    <nav className="flex h-[70px] w-full items-center justify-between border-secondary p-8">
      <div className="inline-flex items-center">
        <Target className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold">DigitalGB</span>
      </div>
      <div className="inline-flex gap-x-2">
        <Link href="/sign-in">
          <Button className="bg-secondary w-[100px] border border-primary text-dark" variant="outline">Log-in</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
