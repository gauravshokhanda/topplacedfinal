"use client";
import { AppBar, Toolbar, Typography, Button, Container,Drawer, Card, CardContent, Grid,Select,MenuItem, Box, TextField, TextareaAutosize, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fields = [
    "Data Analyst",
    "Business Analyst",
    "Full Stack Development",
    "Mobile Development"
  ];


  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { label: "Features", id: "features-section" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Skills", id: "skills-section" },
    { label: "Mentors", id: "mentors-section" },
    { label: "Contact", id: "contact-section" },
  ];

  const handleScheduleInterview = (e) => {
    e.preventDefault();
    
     
    const templateParams = {
      name: name,
      user_email: email,
      mobile: mobile,
      interview_time: interviewTime,
      selected_field: selectedField,
      message: `Interview scheduled for ${interviewTime} in ${selectedField}`
    };


    emailjs.send("service_v6d74tp", "template_84dljhv", templateParams, "092jVXMJK7cGcoq0Q")
      .then((response) => {
        alert("Interview Scheduled! Check your email for confirmation.");
        setEmail("");
        setInterviewTime("");
      })
      .catch((error) => {
        alert("Failed to schedule interview. Please try again.");
      });
  };

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
      <AppBar position="static" sx={{ background: "#106861" }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }} onClick={() => scrollToSection("hero-section")}>TopPlaced</Typography>
          
          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button key={item.label} color="inherit" sx={{ fontWeight: "bold" }} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </Button>
            ))}
            <Button variant="contained" sx={{ background: "white", color: "#106861", fontWeight: "bold" }} onClick={() => router.push("/register")}>Get Started</Button>
          </Box>
          
          {/* Mobile Menu Button */}
          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { xs: "block", md: "none" } }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
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
      </Drawer>
      {/* Hero Section */}
      {/* #106861
      linear-gradient(to right, rgb(176, 180, 188), rgb(228, 228, 228)) */}
      <Box id="hero-section" sx={{ background: "  #106861", color: "black", textAlign: "center", py: 12 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Typography variant="h2" color="white" fontWeight={700}>Perfect Your Interviews & Get Hired!</Typography>
          <Typography variant="h6" color="white" sx={{ mt: 2, maxWidth: "600px", mx: "auto" }}>
            Take <strong>mock interviews</strong>, receive a <strong>performance scorecard</strong>, and improve with expert feedback.
          </Typography>
          <Button variant="contained" sx={{ mt: 3, background: "white", color: "#106861", fontWeight: "bold", px: 4, py: 1.5 }} onClick={() => scrollToSection("how-it-works")}>
            Get Started
          </Button>
        </motion.div>
      </Box>

      {/* How It Works Section */}
      <Container id="how-it-works" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" fontWeight={700} color="#106861">How It Works</Typography>
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ p: 3, textAlign: "center", boxShadow: 3, background: "#106861" }}>
                <CardContent>
                  <Typography variant="h5" color="white" fontWeight={600}>{step.title}</Typography>
                  <Typography variant="body1" color="white" sx={{ mt: 1 }}>{step.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Skills Section */}
      <Container id="skills-section" sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" fontWeight={700} color="#106861">Enhance Your Skills</Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4, maxWidth: "600px", mx: "auto" }}>
          Master the essential fields to excel in your career.
        </Typography>
        <Grid container spacing={4}>
          {skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card sx={{ p: 3, textAlign: "center", boxShadow: 4, background: "#106861" }}>
                  <CardContent>
                    <Typography variant="h6" color="white" fontWeight={600}>{skill.name}</Typography>
                    <Typography variant="body2" color="white" sx={{ mt: 1 }}>{skill.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mentor Section */}
      {/* <Container id="mentors-section" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} color="#106861">Meet Our Mentors</Typography>
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
      </Container> */}

       {/* Schedule an Interview Section */}
       <Container id="schedule-interview" sx={{ textAlign: "center", mt: 8, p: 4, background: "#106861", borderRadius: 2 }}>
        <Typography variant="h4" fontWeight={700} color="white">Schedule an Interview</Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 4 }} onSubmit={handleScheduleInterview}>
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white", maxWidth: "400px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Your Email"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white", maxWidth: "400px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white", maxWidth: "400px" }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <Select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ backgroundColor: "white", maxWidth: "400px" }}
            required
          >
            <MenuItem value="" disabled>Select Your Field</MenuItem>
            {fields.map((field, index) => (
              <MenuItem key={index} value={field}>{field}</MenuItem>
            ))}
          </Select>
          <TextField
            label="Interview Time"
            type="datetime-local"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: "white", maxWidth: "400px" }}
            value={interviewTime}
            onChange={(e) => setInterviewTime(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" sx={{ background: "#ffffff", color: "#106861", fontWeight: "bold", px: 4 }}>
            Schedule Interview
          </Button>
        </Box>
      </Container>


      {/* Contact Section */}
      
   

 {/* Footer Section */}
 <Box sx={{ background: "#106861", color: "white", py: 4, mt: 5 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold">TopPlaced</Typography>
              <Typography variant="body2">Helping you ace your interviews with expert guidance.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold">Quick Links</Typography>
              {navItems.map((item) => (
                <Typography key={item.label}>
                  <Link href={`#${item.id}`} color="white" underline="none">{item.label}</Link>
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold">Contact Us</Typography>
              <Typography variant="body2">Email: topplaced18@gmail.com</Typography>
              <Typography variant="body2">Phone: +91 701 768 2436</Typography>
              <Typography variant="body2">Address: Sector 62 Noida , Uttarpardesh</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
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
