"use client";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, Grid, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ background: "linear-gradient(to right, #1e3c72, #2a5298)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Topplaced
          </Typography>
          <Button color="inherit" onClick={() => router.push("/login")}>Login</Button>
          <Button color="inherit" onClick={() => router.push("/register")}>Register</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #6a11cb, #4a238d)",
          color: "white",
          textAlign: "center",
          py: 10,
        }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" fontWeight={700}>
            Ace Your Interviews & Get Hired with Topplaced!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, maxWidth: "600px", mx: "auto" }}>
            Get expert mentorship, resume crafting, and real mock interviews to land your dream job. Plus, our Job Score Card lets you track your progress.
          </Typography>
        </motion.div>
      </Box>

      <Container sx={{ textAlign: "center", mt: 10 }}>
        {/* Call to Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Button variant="contained" sx={{ mt: 4, mx: 1 }} onClick={() => router.push("/login")}>Login</Button>
          <Button variant="outlined" sx={{ mt: 4, mx: 1 }} onClick={() => router.push("/register")}>Register</Button>
        </motion.div>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 * index, duration: 0.6 }}>
                <Card sx={{ p: 2, textAlign: "center", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight={600}>{feature.title}</Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>{feature.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mentor Swiper Section */}
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700}>
          Meet Our Expert Mentors
        </Typography>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          style={{ marginTop: 20 }}
        >
          {mentors.map((mentor, index) => (
            <SwiperSlide key={index}>
              <Card sx={{ p: 2, textAlign: "center", boxShadow: 3, position: "relative" }}>
                <CardContent>
                  <img src={mentor.image} alt={mentor.name} style={{ width: "100px", borderRadius: "50%", marginBottom: "10px" }} />
                  <Typography variant="h6" fontWeight={600}>{mentor.name}</Typography>
                  <Typography variant="body2">{mentor.expertise}</Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* Contact Us Section */}
      <Box sx={{ textAlign: "center", py: 6, mt: 6, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" fontWeight={700}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Have questions? Reach out to us at <strong>support@topplaced.com</strong>
        </Typography>
      </Box>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "20px", marginTop: "40px", backgroundColor: "#f8f8f8" }}>
        <Typography variant="body2">© {new Date().getFullYear()} Topplaced. All rights reserved.</Typography>
      </footer>
    </>
  );
}

const features = [
  { title: "Mock Interviews", description: "Real interview experience with expert feedback." },
  { title: "Resume Crafting", description: "Professional resume building & optimization." },
  { title: "Job Placement Assistance", description: "Get placed in top companies with our support." },
  { title: "Job Score Card", description: "Evaluate your interview performance & track progress." },
  { title: "Personalized Mentorship", description: "One-on-one guidance from industry experts." },
  { title: "Career Workshops", description: "Interactive sessions to boost your confidence." },
];

const mentors = [
  { name: "John Doe", expertise: "Senior Software Engineer at Google", image: "/images/john_doe.jpg" },
  { name: "Jane Smith", expertise: "Technical Lead at Microsoft", image: "/images/jane_smith.jpg" },
  { name: "Robert Brown", expertise: "Product Manager at Amazon", image: "/images/robert_brown.jpg" },
  { name: "Robert Brown", expertise: "Product Manager at Amazon", image: "/images/robert_brown.jpg" },
  { name: "Robert Brown", expertise: "Product Manager at Amazon", image: "/images/robert_brown.jpg" },
  { name: "Robert Brown", expertise: "Product Manager at Amazon", image: "/images/robert_brown.jpg" },
  { name: "Robert Brown", expertise: "Product Manager at Amazon", image: "/images/robert_brown.jpg" },
];
