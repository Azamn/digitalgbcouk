import { type Metadata } from "next";
import "@/styles/globals.css";
import { appfonts } from "@/fonts";
import AppProvider from "@/components/shared/providers/app-providers";

export const metadata: Metadata = {
  title: "SOCIAL MEDIA APP",
  description: "A NEW GENERATION CODE EDITIOR SOFTWARE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={appfonts}>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
