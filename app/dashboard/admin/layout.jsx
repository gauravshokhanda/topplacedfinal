"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import AdminSidebarLayout from "@/components/AdminSidebarLayout";
import { CircularProgress, Box } from "@mui/material";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { token, user } = useSelector((state) => state.adminAuth);
  const [isReady, setIsReady] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (pathname === "/dashboard/admin/login") {
        setIsAuthorized(true); // allow login page always
      } else if (token && user?.role === "admin") {
        setIsAuthorized(true); // allow admin access
      } else {
        router.replace("/dashboard/admin/login");
      }

      setIsReady(true);
    }, 100); // slight delay for redux-persist hydration
  }, [pathname, token, user]);

  if (!isReady) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthorized) return null;

  return pathname === "/dashboard/admin/login"
    ? children
    : <AdminSidebarLayout>{children}</AdminSidebarLayout>;
}
