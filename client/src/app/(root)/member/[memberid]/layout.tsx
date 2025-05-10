import ClientAppHeader from "@/components/_client/sidebar/client-header";
import MemberHeader from "@/components/_member/sidebar/member-header";
import AppHeader from "@/components/shared/header";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <MemberHeader />
      {children}
    </main>
  );
};

export default layout;
