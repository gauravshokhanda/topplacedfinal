
"use client";

import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function Navbar() { 
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left Section: Back Button and Title */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => router.back()} sx={{ color: "#0A6E6E", mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: "#0A6E6E", fontWeight: "bold" }}>
          Topplaced
        </Typography>
      </Box>

      {/* Right Section: Action Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#fff",
          color: "#0A6E6E",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "20px",
          boxShadow: "none", 
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
        // onClick={() => router.push("/home")} 
      >
        Home
      </Button>
    </Box>
  );
}