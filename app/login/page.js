"use client";

import { Button, Container, TextField, Typography, Card, CardContent, Grid, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from 'next/image'
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    // Simulated API Response
    const mockUserResponse = {
      email,
      role: email === "teacher@gmail.com" ? 1 : email === "student@gmail.com" ? 2 : 0,
    };
  
    if (mockUserResponse.role === 1) {
      localStorage.setItem("role", "teacher");
      router.push("/dashboard/teacher"); // ✅ Corrected
    } else if (mockUserResponse.role === 2) {
      localStorage.setItem("role", "student");
      router.push("/dashboard/student/home"); // ✅ Corrected
    } else {
      alert("Invalid Credentials");
    }
  };
  


  return (
    <Container
      maxWidth={false} // Ensures full width
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
                <TextField fullWidth label="Email" margin="normal" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
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
                >
                  Login
                </Button>
              </motion.div>
            </CardContent>
          </Grid>
          
          {/* Right Side - Image Section */}
          <Grid item xs={12} md={6} sx={{ position: "relative", minHeight: "400px" }}>
  <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative", // Make the Box relative for absolute positioning inside
    }}
  >
    {/* Background Image */}
    <Image
      src="/assets/images/loginLogo.png"
      alt="Login Illustration"
      width={550}
      height={550}
      style={{ objectFit: "cover" }}
    />

    {/* Overlay Text */}
    <Typography
      variant="h5"
      sx={{
        position: "absolute", // Make the text overlay the image
        top: "50%", // Center vertically
        left: "50%", // Center horizontally
        transform: "translate(-50%, -50%)", // Adjust for perfect centering
        color: "white", // Make it readable over the image
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background for better readability
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
