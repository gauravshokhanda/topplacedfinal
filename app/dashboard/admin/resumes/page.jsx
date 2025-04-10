"use client";
import { Container, Typography } from "@mui/material";

export default function AdminResumes() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" color="#106861" fontWeight="bold">
        Resume Submissions
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Manage and review mock resumes submitted by users.
      </Typography>
    </Container>
  );
}