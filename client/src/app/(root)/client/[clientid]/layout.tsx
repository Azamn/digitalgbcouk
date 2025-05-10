import ClientAppHeader from "@/components/_client/sidebar/client-header";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <ClientAppHeader />
      {children}
    </main>
  );
};

export default layout;
