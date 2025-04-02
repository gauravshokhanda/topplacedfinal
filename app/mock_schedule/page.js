// app/mock_schedule/page.js
"use client";
import { useDispatch, useSelector } from "react-redux";
import { updateInterview } from "../redux/slices/interviewScheduleSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Card, CardContent, Grid, Select, MenuItem, Box, TextField, Button, Typography, Avatar, IconButton } from "@mui/material";
import { useState ,useEffect} from "react";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Header from "../../components/Header"; 
import { API } from "../config/apiConfig"; // Adjust the import path as needed


export default function MockInterviewPage() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("26 Mar");
  const [selectedTime, setSelectedTime] = useState("11:00 AM");
  const [timezone, setTimezone] = useState("(GMT+5:30) IST");
  const [field, setField] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [name, setName] = useState("");
  const [dates,setDates]=useState([]);
  const [errors, setErrors] = useState({});

  // Generate 7 days from today (March 26, 2025)
  useEffect(() => {
    const today = new Date("2025-03-26");
    const newDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    });
    setDates(newDates);
  }, []);

  const testimonials = [
    {
      name: "Prashant Kumar",
      text: "Talking to Manya was an incredible experience. Her insights and feedback were spot-on, helping me gain clarity on my career path as a data analyst.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Shweta J. Kashyap",
      text: "Manya provided exceptional guidance during our mock interview. Her advice was practical and tailored to my needs, making me feel more confident.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];


  const validateForm = () => {
      let newErrors = {};
  
      if (!selectedDate) newErrors.selectedDate = "Please select a date";
      if (!selectedTime) newErrors.selectedTime = "Please select a time";
      if (!field) newErrors.field = "Please select your field";
      if (!name.trim()) newErrors.name = "Name is required";
      if (!email.trim()) {
          newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          newErrors.email = "Enter a valid email";
      }
      if (!whatsappNumber.trim()) {
          newErrors.whatsappNumber = "WhatsApp number is required";
      } else if (!/^\d{10}$/.test(whatsappNumber)) {
          newErrors.whatsappNumber = "Enter a valid 10-digit number";
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };
  
  const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
  
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };



  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    const interviewData = {
      selectDate: selectedDate,
      selectTime: convertTo24HourFormat(selectedTime),
      yourField: field,
      name,
      email,
      whatsappNumber,
    };
  
    try {
      const response = await API.post("interviews/", interviewData);
      
      console.log("response", response);
  
      toast.success("Interview scheduled successfully!");
  
      // Reset form fields
      setSelectedDate("");
      setSelectedTime("");
      setField("");
      setName("");
      setEmail("");
      setWhatsappNumber("");
      setErrors({});
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast.error(error.response?.data?.message || "Failed to schedule interview");
    }
  };
  
  


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
      {/* Navbar */}
      <Header />

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflow: "hidden", p: 2,minWidth:"100%" }}>
        <Grid container spacing={2} sx={{ height: "100%", width: "100%" }}>
          {/* Left Section: Interview Details and Testimonials */}
          <Grid item xs={12} md={6} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Card
              sx={{
                borderRadius: 3,
                backgroundColor: "#E6F0FA",
                p: 2,
                mb: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                    Manya Tyagi
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "20px", px: 1 }}>
                    <StarIcon sx={{ color: "#FFD700", fontSize: "18px", mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: "#333" }}>5/5</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", fontSize: { xs: "1.5rem", md: "2rem" } }}>
                    Mock Interview - <br /> Business/Data Analyst
                  </Typography>
                  <Avatar
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Manya Tyagi"
                    sx={{ width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 }, border: "2px solid #fff" }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Button variant="contained" sx={{ backgroundColor: "#fff", color: "#333", borderRadius: "20px", fontWeight: "bold" }}>
                    ₹499
                  </Button>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarTodayIcon sx={{ color: "#333", fontSize: "18px", mr: 0.5 }} />
                    <Typography variant="body2" sx={{ color: "#333" }}>45 mins</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff", mb: 2 }}>TESTIMONIALS</Typography>
            <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2, flexGrow: 1 }}>
              {testimonials.map((testimonial, index) => (
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
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ width: 50, height: 50, mr: 2, border: "2px solid #0A6E6E" }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#0A6E6E" }}>
                          {testimonial.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                          <StarIcon sx={{ color: "#FFD700", fontSize: "16px", mr: 0.5 }} />
                          <Typography variant="body2" sx={{ color: "#666" }}>5/5</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ position: "relative" }}>
                      <FormatQuoteIcon
                        sx={{
                          position: "absolute",
                          top: -10,
                          left: -10,
                          color: "#0A6E6E",
                          opacity: 0.2,
                          fontSize: "40px",
                        }}
                      />
                      <Typography variant="body1" sx={{ color: "#444", fontStyle: "italic", lineHeight: 1.6, textAlign: "center", px: 2 }}>
                        "{testimonial.text}"
                      </Typography>
                      <FormatQuoteIcon
                        sx={{
                          position: "absolute",
                          bottom: -10,
                          right: -10,
                          color: "#0A6E6E",
                          opacity: 0.2,
                          fontSize: "40px",
                          transform: "rotate(180deg)",
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Right Section: Scheduling Form */}
          <Grid item xs={12} md={6} sx={{ height: "100%" }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  overflowY: "auto",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>WHEN should we meet?</Typography>

                {/* Date Selection */}
                <Typography variant="subtitle2" sx={{ color: "#666" }}>Select Date</Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                  {dates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "contained" : "outlined"}
                      onClick={() => setSelectedDate(date)}
                      sx={{
                        minWidth: "70px",
                        borderRadius: "20px",
                        textTransform: "none",
                        backgroundColor: selectedDate === date ? "#0A6E6E" : "transparent",
                        color: selectedDate === date ? "#fff" : "#333",
                        "&:hover": { backgroundColor: selectedDate === date ? "#085858" : "#f0f0f0" },
                        py: 0.5,
                      }}
                    >
                      {date}
                    </Button>
                  ))}
                </Box>
                {errors.selectedDate && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.selectedDate}</Typography>}


                {/* Time Selection */}
                <Typography variant="subtitle2" sx={{ color: "#666" }}>Select Time</Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                  {["11:00 AM", "11:45 AM", "12:30 PM", "03:30 PM"].map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "contained" : "outlined"}
                      onClick={() => setSelectedTime(time)}
                      sx={{
                        minWidth: "70px",
                        borderRadius: "20px",
                        textTransform: "none",
                        backgroundColor: selectedTime === time ? "#0A6E6E" : "transparent",
                        color: selectedTime === time ? "#fff" : "#333",
                        "&:hover": { backgroundColor: selectedTime === time ? "#085858" : "#f0f0f0" },
                        py: 0.5,
                      }}
                    >
                      {time}
                    </Button>
                  ))}
                </Box>
                {errors.selectedTime && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.selectedTime}</Typography>}


                {/* Field Selection */}
                <Typography variant="subtitle2" sx={{ color: "#666" }}>Your Field</Typography>
                <Select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  fullWidth
                  displayEmpty
                  error={!!errors.field}
                  sx={{ mb: 1, borderRadius: "10px", "& .MuiOutlinedInput-root": { py: 0.5 } }}
                >
                  <MenuItem value="" disabled>Select your field</MenuItem>
                  <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                  <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                  <MenuItem value="DevOps">DevOps</MenuItem>
                </Select>
                {errors.field && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.field}</Typography>}


                {/* Name Field */}
                <Typography variant="subtitle2" sx={{ color: "#666" }}>Name</Typography>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  placeholder="Enter your name"
                  error={!!errors.name}
                  // helperText={!name ? "Name is required" : ""}
                  sx={{ mb: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", py: 0.5 } }}
                />
                  {errors.name && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.name}</Typography>}


                {/* Email Field */}
                <Typography variant="subtitle2" sx={{ color: "#666" }}>Email</Typography>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  placeholder="Enter your email"
                  type="email"
                  error={!!errors.email}
                  sx={{ mb: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", py: 0.5 } }}
                />
                  {errors.email && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.email}</Typography>}


                {/* WhatsApp Number Field */}
                <Typography variant="subtitle2" sx={{ color: "#666" }}>WhatsApp Number</Typography>
                <TextField
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  fullWidth
                  placeholder="Enter your WhatsApp number"
                  type="tel"
                  error={!!errors.whatsappNumber}
                  sx={{ mb: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", py: 0.5 } }}
                />
                  {errors.whatsappNumber && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.whatsappNumber}</Typography>}


                {/* Confirm Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "10px",
                    py: 1,
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                  onClick={handleSubmit}                >
                  CONFIRM DETAILS
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}