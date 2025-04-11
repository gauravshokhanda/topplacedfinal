"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: Replace with real API auth logic
    if (email === "admin@topplaced.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      router.push("/dashboard/admin");
    } else {
      alert("Invalid credentials. Try admin@topplaced.com / admin123");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="#106861" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#106861", fontWeight: "bold" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
