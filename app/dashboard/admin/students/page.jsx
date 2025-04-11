"use client";
import { Container, Typography } from "@mui/material";

export default function AdminStudents() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" color="#106861" fontWeight="bold">
        Students Management
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Here you can manage registered students.
      </Typography>
    </Container>
  );
}
