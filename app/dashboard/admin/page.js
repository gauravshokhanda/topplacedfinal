"use client";
import { Container, Typography } from "@mui/material";

export default function TeacherDashboard() {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography variant="body1">Manage your Teacher and students here.</Typography>
    </Container>
  );
}