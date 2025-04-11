"use client";
import { Container, Typography } from "@mui/material";

export default function AdminJobs() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" color="#106861" fontWeight="bold">
        Job Listings
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Manage job cards or opportunities available for students.
      </Typography>
    </Container>
  );
}
