"use client";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4">Register</Typography>
      <TextField fullWidth label="Name" margin="normal" />
      <TextField fullWidth label="Email" margin="normal" />
      <TextField fullWidth label="Password" type="password" margin="normal" />
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => router.push("/dashbaord/teacher")}>Register</Button>
    </Container>
  );
}