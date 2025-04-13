"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Header from "../../../components/Header";
import WorkshopRegisterForm from "../../../components/workshopRegisterForm";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";

export default function WorkshopRegistrationPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [workshop, setWorkshop] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.topplaced.com/api/workshops/${id}`)
        .then((res) => {
          setWorkshop(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching workshop:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!workshop) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography variant="h5" color="error">
          Failed to load workshop.
        </Typography>
      </Box>
    );
  }

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
      {/* <Header /> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <Box sx={{ flexGrow: 1, overflow: "hidden", p: 2, minWidth: "100%" }}>
        <Grid container spacing={2}>
          {/* Left Section */}
          <Grid item xs={12} md={6}>
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1A3C34" }}
                  >
                    {workshop.workshopName}
                  </Typography>
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt={workshop.workshopName}
                    sx={{
                      width: 60,
                      height: 60,
                      border: "2px solid #fff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
                <Typography variant="h6" sx={{ color: "#2E7D7D", fontStyle: "italic" }}>
                  Learn and grow your skills with us!
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: "#1A3C34", fontSize: "20px" }} />
                  <Typography variant="body1" sx={{ color: "#1A3C34" }}>
                    {dayjs(workshop.dateTime).format("DD MMM YYYY | hh:mm A")} IST
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
              {workshop.whatYoullLearn.map((point, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: "300px",
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "#0A6E6E", mb: 1 }}
                    >
                      Topic {index + 1}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#444" }}>
                      {point}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Right Section */}
          <WorkshopRegisterForm />
        </Grid>
      </Box>
    </Box>
  );
}
