// app/mock_schedule/page.js
"use client";

import { Card, CardContent, Grid, Select, MenuItem, Box, TextField, Button, Typography, Avatar, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Header from "../../components/Header";
import MockInterviewSection from "../../components/MockInterviewSection" 
import { ToastContainer } from "react-toastify";



export default function MockInterviewPage() {




  const testimonials = [
    {
      name: "Prashant Kumar",
      text: "Talking to Manya was an incredible experience. Her insights and feedback were spot-on, helping me gain clarity on my career path as a data analyst.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Shweta J. Kashyap",
      text: "Manya provided exceptional guidance during our mock interview. Her advice was practical and tailored to my needs, making me feel more confident.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];



  
  


  return (
    <Box
      sx={{
        backgroundColor: "#0A6E6E",
        minHeight: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Header />

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: "hidden", p: 2,minWidth:"100%" }}>
        <Grid container spacing={2} sx={{ height: "100%", width: "100%" }}>
          {/* Left Section: Interview Details and Testimonials */}
          <Grid item xs={12} md={6} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Card
              sx={{
                borderRadius: 3,
                backgroundColor: "#E6F0FA",
                p: 2,
                mb: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                    Manya Tyagi
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "20px", px: 1 }}>
                    <StarIcon sx={{ color: "#FFD700", fontSize: "18px", mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: "#333" }}>5/5</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", fontSize: { xs: "1.5rem", md: "2rem" } }}>
                    Mock Interview - <br /> Business/Data Analyst
                  </Typography>
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Manya Tyagi"
                    sx={{ width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 }, border: "2px solid #fff" }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Button variant="contained" sx={{ backgroundColor: "#fff", color: "#333", borderRadius: "20px", fontWeight: "bold" }}>
                    ₹499
                  </Button>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarTodayIcon sx={{ color: "#333", fontSize: "18px", mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: "#333" }}>45 mins</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>TESTIMONIALS</Typography>
            <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2, flexGrow: 1 }}>
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: "300px",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                    backgroundColor: "#fff",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 50, height: 50, mr: 2, border: "2px solid #0A6E6E" }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#0A6E6E" }}>
                          {testimonial.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                          <StarIcon sx={{ color: "#FFD700", fontSize: "16px", mr: 0.5 }} />
                          <Typography variant="body2" sx={{ color: "#666" }}>5/5</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ position: "relative" }}>
                      <FormatQuoteIcon
                        sx={{
                          position: "absolute",
                          top: -10,
                          left: -10,
                          color: "#0A6E6E",
                          opacity: 0.2,
                          fontSize: "40px",
                        }}
                      />
                      <Typography variant="body1" sx={{ color: "#444", fontStyle: "italic", lineHeight: 1.6, textAlign: "center", px: 2 }}>
                        "{testimonial.text}"
                      </Typography>
                      <FormatQuoteIcon
                        sx={{
                          position: "absolute",
                          bottom: -10,
                          right: -10,
                          color: "#0A6E6E",
                          opacity: 0.2,
                          fontSize: "40px",
                          transform: "rotate(180deg)",
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Right Section: Scheduling Form */}
         <MockInterviewSection/>
        </Grid>
      </Box>
    </Box>
  );
}