import type { Metadata } from "next";
import "./globals.css";
import { FC, ReactNode } from "react";
import Navbar from "@/components/Navbar";

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="mx-auto max-w-screen-lg">
          <div className="text-center my-2 mx-4">{children}</div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
