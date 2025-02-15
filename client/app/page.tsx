"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setUserRole(storedRole);

      const redirectPath =
        storedRole === "admin"
          ? "/admin/statistics"
          : storedRole === "operator"
          ? "/operator/approval_tracker"
          : "/oem_odm/request_dashboard";

      router.replace(redirectPath);
    }
  }, [router]);

  return <div className="text-white">Redirecting...</div>;
}
