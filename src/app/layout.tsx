import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import LayoutWrapper from "./Components/LayoutWrapper";

import { basepath } from "./common/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-poppins",
  style: ["normal"],
});

export const metadata: Metadata = {
  icons: {
    icon: `${basepath}/favicon.ico`,
  },
  title: "IT Courses with certification - Global Knowledge Technologies",
  description: "LEARNING REDEFINED",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased w-full`}
      >
        <ToastContainer />

        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
