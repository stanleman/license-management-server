import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Sidebar from "./components/sidebar";
import "./globals.css";
import { ToastContainer } from 'react-toastify';

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMS",
  description: "License Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased bg-[#181C1F] flex`}>
        <Sidebar />
        {children}
        <ToastContainer theme="dark"/>
      </body>
    </html>
  );
}
