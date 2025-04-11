"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";

export default function UpcomingWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.topplaced.com/api/workshops")
      .then((res) => {
        setWorkshops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workshops:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight={700} color="#106861" gutterBottom>
        Upcoming Workshops
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : workshops.length === 0 ? (
        <Typography variant="body1">No workshops available.</Typography>
      ) : (
        <Grid container spacing={4}>
          {workshops.map((workshop) => (
            <Grid item xs={12} md={6} key={workshop._id}>
              <Card
                sx={{
                  backgroundColor: "#f9f9f9",
                  p: 2,
                  boxShadow: 3,
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
                  {/* Add description when API supports it */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
