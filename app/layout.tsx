import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playFair = Playfair({
  variable: "--font-playfair",
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
      <body className={`${inter.variable} ${playFair.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
