"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const router = useRouter();

  return (
    <aside className="w-64 h-full bg-[#212529] text-white">
      <div className="p-4 text-xl font-bold ">LMS</div>
      <nav className="mt-4">
        <ul>
          {items.map((item, index) => {
            const pathname = usePathname();

            const isActive = pathname === item.href;

            return (
              <li key={index} className="">
                <Link href={item.href}>
                  <p
                    className={`flex items-center px-4 py-3 ${
                      isActive
                        ? "bg-[#181C1F] text-[#BCE29E]"
                        : "hover:bg-[#272c30]"
                    }`}
                  >
                    {item.icon && <span className="mr-3">{item.icon}</span>}
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
