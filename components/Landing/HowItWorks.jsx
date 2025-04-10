"use client";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

const steps = [
  { title: "Sign Up", description: "Register and create your profile." },
  { title: "Book Mock Interview", description: "Schedule a session with an expert mentor." },
  { title: "Receive Feedback", description: "Get a scorecard with performance insights." }
];

export default function HowItWorks() {
  return (
    <Container id="how-it-works" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" fontWeight={700} color="#106861">
        How It Works
      </Typography>

      <Grid container spacing={4} sx={{ mt: 6 }}>
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 3, textAlign: "center", boxShadow: 3, background: "#106861" }}>
              <CardContent>
                <Typography variant="h5" color="white" fontWeight={600}>
                  {step.title}
                </Typography>
                <Typography variant="body1" color="white" sx={{ mt: 1 }}>
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
