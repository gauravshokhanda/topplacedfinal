"use client";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, Grid, Box, TextField, TextareaAutosize, List, ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

export default function LandingPage() {
  const router = useRouter();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const toggleDrawer = (open) => (event) => {
    // Ignore tab or shift key events to prevent unwanted toggling
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setDrawerOpen(open);
  };

  const navItems = [
    { label: "Features", id: "features-section" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Skills", id: "skills-section" },
    { label: "Mentors", id: "mentors-section" },
    { label: "Contact", id: "contact-section" },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.label} onClick={() => scrollToSection(item.id)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button key="Get Started" onClick={() => router.push("/register")}>
          <ListItemText primary="Get Started" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Header with Navigation Menu */}
      <AppBar position="static" sx={{ background: "#4a248d" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }} onClick={() => scrollToSection("hero-section")}>
            TopPlaced
          </Typography>
          <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={() => scrollToSection("features-section")}>Features</Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={() => scrollToSection("how-it-works")}>How It Works</Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={() => scrollToSection("skills-section")}>Skills</Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={() => scrollToSection("mentors-section")}>Mentors</Button>
          <Button color="inherit" sx={{ fontWeight: "bold" }} onClick={() => scrollToSection("contact-section")}>Contact</Button>
          <Button variant="contained" sx={{ ml: 2, background: "white", color: "#4a248d", fontWeight: "bold" }}
          //  onClick={() => router.push("/register")}
           >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box id="hero-section" sx={{ background: "linear-gradient(to right, rgb(176, 180, 188), rgb(228, 228, 228))", color: "black", textAlign: "center", py: 12 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" fontWeight={700}>Perfect Your Interviews & Get Hired!</Typography>
          <Typography variant="h6" sx={{ mt: 2, maxWidth: "600px", mx: "auto" }}>
            Take <strong>mock interviews</strong>, receive a <strong>performance scorecard</strong>, and improve with expert feedback.
          </Typography>
          <Button variant="contained" sx={{ mt: 3, background: "#4a248d", color: "white", fontWeight: "bold", px: 4, py: 1.5 }} onClick={() => scrollToSection("how-it-works")}>
            Get Started
          </Button>
        </motion.div>
      </Box>

      {/* How It Works Section */}
      <Container id="how-it-works" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" fontWeight={700} color="#4a248d">How It Works</Typography>
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ p: 3, textAlign: "center", boxShadow: 3, background: "#F5F5F5" }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={600}>{step.title}</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>{step.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Skills Section */}
      <Container id="skills-section" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" fontWeight={700} color="#4a248d">Enhance Your Skills</Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4, maxWidth: "600px", mx: "auto" }}>
          Master the essential fields to excel in your career.
        </Typography>
        <Grid container spacing={4}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card sx={{ p: 3, textAlign: "center", boxShadow: 4, background: "#fff" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>{skill.name}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{skill.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mentor Section */}
      <Container id="mentors-section" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} color="#4a248d">Meet Our Mentors</Typography>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
          pagination={true}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          style={{ marginTop: 20 }}
        >
          {mentors.map((mentor, index) => (
            <SwiperSlide key={index}>
              <Card sx={{ p: 2, textAlign: "center", boxShadow: 3, background: "#F5F5F5" }}>
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

      {/* Contact Section */}
      <Container 
  id="contact-section" 
  sx={{ 
    textAlign: "center", 
    mt: 8, 
    mb: 8, 
    p: 4, 
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", 
    borderRadius: 2 
  }}
>
  <Typography variant="h4" fontWeight={700} color="#4a248d">Get In Touch</Typography>
  <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 4 }}>
    <Card sx={{ p: 4, width: "300px", boxShadow: 3, background: "#F5F5F5" }}>
      <Typography variant="h6">Need Guidance?</Typography>
      <Typography variant="body2">Reach out to our mentors for career support.</Typography>
    </Card>
    <Card sx={{ p: 4, width: "300px", boxShadow: 3, background: "#F5F5F5" }}>
      <Typography variant="h6">Enroll in Mock Interviews</Typography>
      <Typography variant="body2">Start your interview prep today.</Typography>
    </Card>
  </Box>
  <Box component="form" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 4 }}>
    <TextField label="Your Name" variant="outlined" fullWidth sx={{ maxWidth: "400px" }} />
    <TextField label="Your Email" variant="outlined" fullWidth sx={{ maxWidth: "400px" }} />
    <TextareaAutosize 
      minRows={4} 
      placeholder="Your Message" 
      style={{ width: "400px", padding: "10px", borderRadius: "5px", borderColor: "#ccc" }} 
    />
    <Button variant="contained" sx={{ background: "#4a248d", color: "white", fontWeight: "bold", px: 4 }}>
      Submit
    </Button>
  </Box>
</Container>

    </>
  );
}

const steps = [
  { title: "Sign Up", description: "Register and create your profile." },
  { title: "Book Mock Interview", description: "Schedule a session with an expert mentor." },
  { title: "Receive Feedback", description: "Get a scorecard with performance insights." }
];

const skills = [
  { name: "Frontend Development", description: "Design and develop responsive, interactive UIs using modern frameworks." },
  { name: "Backend Development", description: "Build robust server-side architectures and APIs." },
  { name: "Data Analysis", description: "Analyze and interpret complex data to drive business decisions." },
  { name: "Mobile Development", description: "Create seamless mobile applications for iOS and Android." },
  { name: "DevOps", description: "Streamline development processes with CI/CD and automation." },
  { name: "Sales", description: "Leverage tech insights to drive business growth and revenue." }
];

const mentors = [
  { name: "John Doe", expertise: "Senior Software Engineer at Google", image: "/images/john_doe.jpg" }
];
