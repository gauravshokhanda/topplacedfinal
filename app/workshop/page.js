
"use client";

import { Card, CardContent, Grid, Box, Typography, Avatar } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Header from "../../components/Header";
import WorkshopRegisterForm from "../../components/workshopRegisterForm";
import { ToastContainer } from "react-toastify";

export default function WorkshopRegistrationPage() {
  const workshopDetails = {
    name: "Data Analytics Masterclass",
    description: "Unlock the power",
    date: "15 Apr 2025",
    time: "10:00 AM IST",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  };

  const whatYoullLearn = [
    {
      title: "Introduction to Data Analytics",
      description: "Learn the basics of data analytics and its applications in real-world scenarios.",
    },
    {
      title: "Data Visualization with Tools",
      description: "Master tools like Tableau and Power BI to create impactful visualizations.",
    },
    {
      title: "Hands-On Case Studies",
      description: "Work on real-world datasets to solve business problems.",
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
      <Header />

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: "hidden", p: 2, minWidth: "100%" }}>
        <Grid container spacing={2} sx={{ height: "100%", width: "100%" }}>
          {/* Left Section: Workshop Details and What You'll Learn */}
          <Grid item xs={12} md={6} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Card
              sx={{
                borderRadius: 3,
                backgroundColor: "#E6F0FA",
                p: 3,
                mb: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "#1A3C34",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {workshopDetails.name}
                  </Typography>
                  <Avatar
                    src={workshopDetails.avatar}
                    alt={workshopDetails.name}
                    sx={{ width: 60, height: 60, border: "2px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2E7D7D",
                    fontStyle: "italic",
                    fontWeight: "medium",
                    lineHeight: 1.4,
                  }}
                >
                  {workshopDetails.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: "#1A3C34", fontSize: "20px" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1A3C34",
                      fontWeight: "medium",
                    }}
                  >
                    {workshopDetails.date} | {workshopDetails.time}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>
              WHAT YOU'LL LEARN
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                pb: 2,
              
                scrollbarWidth: "none", 
                "&::-webkit-scrollbar": {
                  display: "none", 
                },
                msOverflowStyle: "none", 
              }}
            >
              {whatYoullLearn.map((item, index) => (
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
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#0A6E6E", mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Right Section: Registration Form */}
          <WorkshopRegisterForm />
        </Grid>
      </Box>
    </Box>
  );
}