"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Box, AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      router.push("/login");
    } else {
      setRole(storedRole);
    }
  }, [router]);

  const roleTitles = {
    register: "Register Dashboard",
    student: "Student Dashboard",
    teacher: "Teacher Dashboard",
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {roleTitles[role] || "Dashboard"}
          </Typography>
          <Button color="inherit" component={Link} href="/dashboard/teacher">
            Teacher
          </Button>
          <Button color="inherit" component={Link} href="/dashboard/student">
            Student
          </Button>
          <Button color="inherit" component={Link} href="/login" onClick={() => localStorage.clear()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container sx={{ flexGrow: 1, mt: 4 }}>{children}</Container>
    </Box>
  );
}
