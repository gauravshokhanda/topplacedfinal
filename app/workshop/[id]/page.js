"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import WorkshopRegisterForm from "../../../components/workshopRegisterForm";

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
        color: "#fff",
        py: 4,
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Grid container spacing={4} justifyContent="center" px={3}>
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          {/* Workshop Title Section */}
          <Box
            sx={{ backgroundColor: "#D3F1F1", p: 3, borderRadius: 3, mb: 4 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#0A6E6E",
              }}
            >
              {workshop.workshopName}
            </Typography>
            <Typography
              sx={{
                mt: 2,
                textAlign: "center",
                color: "#1B3B3B",
              }}
            >
              Join us for a powerful session on building a standout resume and
              optimizing your LinkedIn profile. Learn how to structure your
              resume, showcase achievements, and tailor it for any role.
            </Typography>
          </Box>

          {/* What You'll Learn */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            WHAT YOU’LL LEARN
          </Typography>
          <Card sx={{ backgroundColor: "#fff", borderRadius: 3, p: 2, mb: 4 }}>
            <CardContent>
              <ul style={{ color: "#0A6E6E", paddingLeft: 20 }}>
                {workshop.whatYoullLearn.map((item, index) => (
                  <li key={index} style={{ marginBottom: 10 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Grid container spacing={2}>
            {["Zal ul Nabi Baig", "Sourabh Samanta", "Sourabh Samanta"].map(
              (name, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ backgroundColor: "#fff", borderRadius: 2, p: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#0A6E6E", mb: 1 }}
                    >
                      The session was highly informative, and I got all of my
                      queries solved.
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#888" }}>
                      {name} <br /> Mar 2025
                    </Typography>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Grid>

     
    <WorkshopRegisterForm />

      </Grid>
    </Box>
  );
}
