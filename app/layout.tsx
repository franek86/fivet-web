import React from "react";
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";

import { Urbanist } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fivet Ship Broker ",
  description:
    "Fivet Ship Broker - international ship brokering company specialized in sale and purchase of tankers, cargo vessels, and offshore ships worldwide. Professional, trusted, and confidential maritime transactions.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body className={`${urbanist.variable} antialiased`}>
        <Header />
        <main className='pt-[70px]'>
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
