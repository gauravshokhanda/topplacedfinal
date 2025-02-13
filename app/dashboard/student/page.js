"use client";
import { Container, Typography } from "@mui/material";

export default function TeacherDashboard() {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4">Student Dashboard</Typography>
      <Typography variant="body1">Manage your courses and students here.</Typography>
    </Container>
  );
}