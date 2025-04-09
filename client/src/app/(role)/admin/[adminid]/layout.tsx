import AppHeader from "@/components/shared/header";
export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <AppHeader />
      {children}
    </main>
  );
}
