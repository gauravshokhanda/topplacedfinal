"use client";

import { Button, Container, TextField, Typography, Card, CardContent, Grid, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "teacher") {
        router.push("/dashboard/teacher");
      } else if (data.user.role === "student") {
        router.push("/dashboard/student/home");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInLogin = () => {
    const popup = window.open(
      "http://localhost:5100/api/auth/linkedin",
      "LinkedIn Login",
      "width=600,height=700"
    );
  
    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        fetchLinkedInUser();
      }
    }, 1000);
  };
  
  // ✅ Fetch LinkedIn user after popup login
  const fetchLinkedInUser = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");
  
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      router.push("/dashboard");
    }
  };
  
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "radial-gradient(circle, rgb(171, 151, 192), rgb(75, 116, 193))",
      }}
    >
      <Card sx={{ width: "70%", borderRadius: 3, boxShadow: 5, overflow: "hidden" }}>
        <Grid container sx={{ height: "100%" }}>
          {/* Left Side - Login Form */}
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: 4 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Welcome Back
              </Typography>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <TextField fullWidth label="Email" margin="normal" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, fontSize: "1rem", borderRadius: 2, background: "#4a238d" }}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, fontSize: "1rem", borderRadius: 2, background: "#0077b5" }}
                  onClick={handleLinkedInLogin}
                >
                  Login with LinkedIn
                </Button>
              </motion.div>
            </CardContent>
          </Grid>

          {/* Right Side - Image Section */}
          <Grid item xs={12} md={6} sx={{ position: "relative", minHeight: "400px" }}>
            <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src="/assets/images/loginLogo.png" alt="Login Illustration" width={550} height={550} style={{ objectFit: "cover" }} />
              <Typography
                variant="h5"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                Welcome to Our Platform
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
