import { Providers } from "@/store/Provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { notojp } from "@/libs/font";
import BottomNavbar from "./_components/Common/BottomNavbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notojp.variable}`}>
      <body className="h-screen bg-back font-notojp">
        <Providers>
          {children}
          <BottomNavbar />
        </Providers>
        <div className="h-20"></div>
      </body>
    </html>
  );
}
