"use client";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function HeroSection() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      id="hero-section"
      sx={{
        background: "#106861",
        color: "white",
        textAlign: "center",
        py: 12,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" fontWeight={700}>
          Perfect Your Interviews & Get Hired!
        </Typography>
        <Typography
          variant="h6"
          sx={{ mt: 2, maxWidth: "600px", mx: "auto" }}
        >
          Take <strong>mock interviews</strong>, receive a{" "}
          <strong>performance scorecard</strong>, and improve with expert
          feedback.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            background: "white",
            color: "#106861",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
          }}
          onClick={() => scrollToSection("how-it-works")}
        >
          Get Started
        </Button>
      </motion.div>
    </Box>
  );
}
