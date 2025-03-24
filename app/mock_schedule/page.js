// app/mock_schedule/page.js
"use client";

import {
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import dynamic from "next/dynamic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Dynamically import Swiper to avoid hydration issues
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function MockInterviewPage() {
  const [selectedDate, setSelectedDate] = useState("25 Mar");
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [timezone, setTimezone] = useState(
    "(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi (IST)"
  );
  const [field, setField] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [name, setName] = useState("");

  // Testimonials data
  const testimonials = [
    {
      name: "Prashant Kumar",
      text: "Talking to Manya was an incredible experience. Her insights and feedback were spot-on, helping me gain clarity on my career path as a data analyst.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder avatar
    },
    {
      name: "Shweta J. Kashyap",
      text: "Manya provided exceptional guidance during our mock interview. Her advice was practical and tailored to my needs, making me feel more confident.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg", // Placeholder avatar
    },
    {
      name: "Amit Sharma",
      text: "The mock interview with Manya was a game-changer for me. Her professional approach and detailed feedback helped me improve significantly.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg", // Placeholder avatar
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#0A6E6E", minHeight: "100vh", p: 4 }}>
      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Section: Interview Details and Testimonials */}
        <Grid item xs={12} md={6}>
          {/* Interview Details Card */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "#E6F0FA", // Light blue background as in the screenshot
              position: "relative",
              p: 2,
            }}
          >
            <CardContent>
              {/* Top Section: Name and Rating */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton sx={{ mr: 1 }}>
                    <ArrowBackIcon sx={{ color: "#333" }} />
                  </IconButton>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Manya Tyagi
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <StarIcon
                    sx={{ color: "#FFD700", fontSize: "18px", mr: 0.5 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", fontWeight: "medium" }}
                  >
                    5/5
                  </Typography>
                </Box>
              </Box>

              {/* Middle Section: Title and Profile Picture */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      lineHeight: 1.2,
                      fontSize: { xs: "1.5rem", md: "2rem" },
                    }}
                  >
                    Mock Interview - Business/
                    <br />
                    Data Analyst
                  </Typography>
                </Box>
                <Avatar
                  src="https://randomuser.me/api/portraits/women/65.jpg" // Placeholder for Manya Tyagi's profile picture
                  alt="Manya Tyagi"
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    border: "2px solid #fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>

              {/* Bottom Section: Price and Duration */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#333",
                    borderRadius: "20px",
                    px: 2,
                    py: 0.5,
                    fontWeight: "bold",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    textTransform: "none",
                  }}
                >
                  ₹499
                </Button>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarTodayIcon
                    sx={{ color: "#333", fontSize: "18px", mr: 0.5 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", fontWeight: "medium" }}
                  >
                    45 mins meeting
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Testimonials Section */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#fff", mb: 3 }}
          >
            TESTIMONIALS
          </Typography>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            grabCursor={true}
            pagination={{ clickable: true }}
            navigation={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
            }}
            style={{
              paddingBottom: "40px",
              "--swiper-pagination-color": "#fff",
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-bullet-inactive-color": "#ccc",
              "--swiper-pagination-bullet-inactive-opacity": "0.5",
              "--swiper-navigation-size": "25px",
              width: "100%", // Ensure Swiper takes full width
            }}
            onSwiper={(swiper) => console.log("Swiper initialized:", swiper)} // Debug log
            onSlideChange={() => console.log("Slide changed")} // Debug log
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} style={{ display: "flex" }}>
                <Card
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                    height: "220px",
                    width: "100%", // Ensure card fills slide
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#444",
                        fontStyle: "italic",
                        lineHeight: 1.5,
                        mb: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{
                        width: 40,
                        height: 40,
                        mr: 1.5,
                        border: "2px solid #0A6E6E",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", color: "#0A6E6E" }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <StarIcon
                          sx={{ color: "#FFD700", fontSize: "14px", mr: 0.5 }}
                        />
                        <Typography variant="caption" sx={{ color: "#666" }}>
                          5/5
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        {/* Right Section: Scheduling Form */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                WHEN should we meet?
              </Typography>

              {/* Date Selection */}
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#666" }}
              >
                Select Date
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
                {["25 Mar", "26 Wed", "27 Thu", "28 Sat", "31 Mon"].map(
                  (date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "contained" : "outlined"}
                      onClick={() => setSelectedDate(date)}
                      sx={{
                        minWidth: "90px",
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: "medium",
                        backgroundColor:
                          selectedDate === date ? "#0A6E6E" : "transparent",
                        "&:hover": {
                          backgroundColor:
                            selectedDate === date ? "#085858" : "#f0f0f0",
                        },
                      }}
                    >
                      {date}
                    </Button>
                  )
                )}
              </Box>

              {/* Time Selection */}
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#666" }}
              >
                Select time of the day
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
                {["11:00 AM", "11:45 AM", "12:30 PM", "03:30 PM"].map(
                  (time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "contained" : "outlined"}
                      onClick={() => setSelectedTime(time)}
                      sx={{
                        minWidth: "90px",
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: "medium",
                        backgroundColor:
                          selectedTime === time ? "#0A6E6E" : "transparent",
                        "&:hover": {
                          backgroundColor:
                            selectedTime === time ? "#085858" : "#f0f0f0",
                        },
                      }}
                    >
                      {time}
                    </Button>
                  )
                )}
              </Box>

              {/* Timezone Selection */}
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#666" }}
              >
                Timezone
              </Typography>
              <Select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                fullWidth
                sx={{ mb: 3, borderRadius: "10px" }}
              >
                <MenuItem value="(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi (IST)">
                  (GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi (IST)
                </MenuItem>
                {/* Add more timezones as needed */}
              </Select>

              {/* Field Selection */}
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#666" }}
              >
                Which field are you in?
              </Typography>
              <Select
                value={field}
                onChange={(e) => setField(e.target.value)}
                fullWidth
                sx={{ mb: 3, borderRadius: "10px" }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select your field
                </MenuItem>
                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                <MenuItem value="DevOps">DevOps</MenuItem>
                <MenuItem value="XYZ">XYZ</MenuItem>
              </Select>

              {/* Name Field */}
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#666" }}
              >
                Name
              </Typography>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ mb: 3, borderRadius: "10px" }}
                placeholder="Enter your name"
              />

              {/* Email Field */}
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#666" }}
              >
                Email
              </Typography>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 3, borderRadius: "10px" }}
                placeholder="Enter your email"
                type="email"
              />

              {/* WhatsApp Number Field */}
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#666" }}
              >
                WhatsApp Number
              </Typography>
              <TextField
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                fullWidth
                sx={{ mb: 3, borderRadius: "10px" }}
                placeholder="Enter your WhatsApp number"
                type="tel"
              />

              {/* Confirm Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "10px",
                  py: 1.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                CONFIRM DETAILS
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
