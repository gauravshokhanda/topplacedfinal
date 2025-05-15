"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { API } from "@/app/config/apiConfig";

export default function UpcomingWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    API.get("workshops")
      .then((res) => {
        setWorkshops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workshops:", err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    console.log("Redirecting to workshop with ID:", id);
    router.push(`/workshop/${id}`);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight={700} color="#106861" gutterBottom>
        Upcoming Workshops
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress size={48} sx={{ color: "#106861" }} />
        </Box>
      ) : workshops.length === 0 ? (
        <Typography variant="body1">No workshops available.</Typography>
      ) : (
        <Grid container spacing={4}>
          {workshops.map((workshop) => (
            <Grid item xs={12} md={6} key={workshop._id}>
              <Card
                onClick={() => handleCardClick(workshop._id)}
                sx={{
                  backgroundColor: "#f9f9f9",
                  p: 2,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    color="#106861"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {workshop.workshopName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date:{" "}
                    {dayjs(workshop.dateTime).format("MMMM D, YYYY h:mm A")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{workshop.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
