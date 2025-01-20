import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Sidebar from "./components/sidebar";
import "./globals.css";

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

  let userLevel = "admin";


  const OEMODMItems = [
    { label: "Request", href: "/oem_odm/request_dashboard" },
    { label: "History", href: "/oem_odm/approval_history" },
  ];

  const operatorItems = [
    { label: "Approval Tracker", href: "/operator/approval_tracker" },
    { label: "License Request", href: "/operator/license_request" },
  ];

  const adminItems = [
    { label: "Statistics", href: "/admin/statistics" },
    { label: "License Analysis", href: "/admin/license_analysis" },
    { label: "Activities List", href: "/admin/activities_list" },
  ];

  const sidebarItems =
    userLevel === "admin"
      ? adminItems
      : userLevel === "operator"
        ? operatorItems
        : OEMODMItems;

  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-[#181C1F] flex`}
      >
        <Sidebar items={sidebarItems} />
        {children}
      </body>
    </html>
  );
}
