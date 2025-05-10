"use client";
import StoreProvider from "@/store";
import { Toaster } from "@/components/ui/toaster";
import { ViewTransitions } from 'next-view-transitions'
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-primary-600 flex min-h-screen w-full">
      <main className="dark:bg-dark-primary flex w-full flex-col">
        {children}
      </main>
    </div>
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ViewTransitions>
      <StoreProvider>
        <Toaster />
        <AppLayout>{children}</AppLayout>
      </StoreProvider>
    </ViewTransitions>
  );
};

export default AppProvider;
