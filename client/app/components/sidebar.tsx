"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

const Sidebar: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem("role");

      if (storedRole) {
        setUserRole(storedRole);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    setIsLoaded(true);
  }, [pathname]);

  if (!isLoaded) return <div className="text-white p-4">Loading...</div>;

  const sidebarItems =
    userRole === "admin"
      ? [
          { label: "Statistics", href: "/admin/statistics" },
          { label: "License Analysis", href: "/admin/license_analysis" },
          { label: "Activities List", href: "/admin/activities_list" },
        ]
      : userRole === "operator"
      ? [
          { label: "Approval Tracker", href: "/operator/approval_tracker" },
          { label: "License Request", href: "/operator/license_request" },
        ]
      : [
          { label: "Request", href: "/oem_odm/request_dashboard" },
          { label: "History", href: "/oem_odm/approval_history" },
        ];

  const handleSignOut = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    toast("Logged out successfully.",{type: 'success'})
    router.push("/login");
  };

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <aside className="w-64 h-screen bg-[#212529] text-white sticky top-0 border-r border-[#2D3237] flex flex-col">
      <div className="p-4 text-xl font-bold">LMS</div>
      <nav className="mt-4 flex-1">
        <ul>
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <li key={index}>
                <Link href={item.href}>
                  <p
                    className={`flex items-center px-4 py-3 ${
                      isActive
                        ? "bg-[#181C1F] text-[#BCE29E]"
                        : "hover:bg-[#272c30]"
                    }`}
                  >
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-[#2D3237]">
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md text-center"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
