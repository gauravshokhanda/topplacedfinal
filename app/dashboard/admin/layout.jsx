"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebarLayout from "@/components/AdminSidebarLayout";
import { CircularProgress, Box } from "@mui/material";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (pathname === "/dashboard/admin/login") {
      setIsAuthorized(true); // Allow rendering login page
    } else if (role === "admin") {
      setIsAuthorized(true); // Allow admin pages
    } else {
      router.push("/dashboard/admin/login");
    }

    setIsReady(true);
  }, [pathname]);

  if (!isReady) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthorized) return null;

  return pathname === "/dashboard/admin/login"
    ? children // don't show sidebar
    : <AdminSidebarLayout>{children}</AdminSidebarLayout>;
}
