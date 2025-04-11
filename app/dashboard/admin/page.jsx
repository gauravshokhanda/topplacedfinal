"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Typography } from "@mui/material";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/dashboard/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, []);

  if (!isAuthorized) return null;

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography variant="body1">
        Manage all interviews, users, and data from this panel.
      </Typography>
    </Container>
  );
}
