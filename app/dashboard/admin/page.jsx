"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Container, Typography } from "@mui/material";

export default function AdminDashboard() {
  const router = useRouter();
  const { token, user } = useSelector((state) => state.adminAuth);
  const [isMounted, setIsMounted] = useState(false); // ✅ Fix hydration

  // ✅ Ensure this runs only on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Redirect if not authorized (after mount)
  useEffect(() => {
    if (!isMounted) return;

    if (!token || user?.role?.toLowerCase() !== "admin") {
      router.replace("/dashboard/admin/login");
    }
  }, [isMounted, token, user, router]);

  // ✅ Prevent hydration mismatch
  if (!isMounted || !token || user?.role?.toLowerCase() !== "admin") return null;

  return (
    <Container sx={{ textAlign: "center",border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography variant="body1">
        Manage all interviews, users, and data from this panel.
      </Typography>
    </Container>
  );
}
