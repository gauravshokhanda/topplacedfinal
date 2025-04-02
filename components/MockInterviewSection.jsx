"use client";
import React from "react";
import { API } from "../app/config/apiConfig";
import { useDispatch } from "react-redux";
import { updateInterview } from "../app/redux/slices/interviewScheduleSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Card, CardContent, Grid, Select, MenuItem, Box, TextField, Button, Typography } from "@mui/material";

const MockInterviewSection = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timezone, setTimezone] = useState("(GMT+5:30) IST");
  const [field, setField] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [name, setName] = useState("");
  const [dates, setDates] = useState([]);
  const [isoDates, setIsoDates] = useState({}); // Store mapping of display date to ISO date
  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch available dates for the week
  useEffect(() => {
    const fetchAvailableDates = async () => {
      setLoading(true);
      try {
        const response = await API.get("interviews/available/week");
        const weekData = response.data.slots.filter((slot) => slot.isAvailable);
        const dateList = weekData.map((slot) => slot.date);
        const isoDateMap = weekData.reduce((acc, slot) => {
          acc[slot.date] = slot.isoDate; // Map "30 Mar" to "2025-03-30"
          return acc;
        }, {});
        setDates(dateList);
        setIsoDates(isoDateMap);
        if (dateList.length > 0) {
          setSelectedDate(dateList[0]); // Set the first available date as default
        }
      } catch (error) {
        console.error("Error fetching available dates:", error);
        toast.error("Failed to load available dates");
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableDates();
  }, []);

  // Fetch available times for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailableTimes = async () => {
      setLoading(true);
      try {
        const isoDate = isoDates[selectedDate]; // Get the ISO date for the selected display date
        const response = await API.get(`interviews/available/date/${isoDate}`);
        const times = response.data.availableTimes.map((time) => {
          const [hours, minutes] = time.split(":");
          const hourNum = parseInt(hours, 10);
          const period = hourNum >= 12 ? "PM" : "AM";
          const adjustedHour = hourNum % 12 || 12; // Convert 0 to 12 for 12 AM
          return `${adjustedHour}:${minutes} ${period}`;
        });
        setAvailableTimes(times);
        setSelectedTime(times[0] || ""); // Set the first available time as default
      } catch (error) {
        console.error("Error fetching available times:", error);
        toast.error("Failed to load available times");
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableTimes();
  }, [selectedDate, isoDates]);

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
      selectDate: isoDates[selectedDate], // Use ISO date for submission
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
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
            WHEN should we meet?
          </Typography>

          {/* Date Selection */}
          <Typography variant="subtitle2" sx={{ color: "#666" }}>
            Select Date
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
            {loading ? (
              <Typography>Loading dates...</Typography>
            ) : (
              dates.map((date) => (
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
              ))
            )}
          </Box>
          {errors.selectedDate && (
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.selectedDate}</Typography>
          )}

          {/* Time Selection */}
          <Typography variant="subtitle2" sx={{ color: "#666" }}>
            Select Time
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
            {loading ? (
              <Typography>Loading times...</Typography>
            ) : (
              availableTimes.map((time) => (
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
              ))
            )}
          </Box>
          {errors.selectedTime && (
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.selectedTime}</Typography>
          )}

          {/* Field Selection */}
          <Typography variant="subtitle2" sx={{ color: "#666" }}>
            Your Field
          </Typography>
          <Select
            value={field}
            onChange={(e) => setField(e.target.value)}
            fullWidth
            displayEmpty
            error={!!errors.field}
            sx={{ mb: 1, borderRadius: "10px", "& .MuiOutlinedInput-root": { py: 0.5 } }}
          >
            <MenuItem value="" disabled>
              Select your field
            </MenuItem>
            <MenuItem value="Data Analyst">Data Analyst</MenuItem>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="DevOps">DevOps</MenuItem>
          </Select>
          {errors.field && (
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.field}</Typography>
          )}

          {/* Name Field */}
          <Typography variant="subtitle2" sx={{ color: "#666" }}>
            Name
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            placeholder="Enter your name"
            error={!!errors.name}
            sx={{ mb: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", py: 0.5 } }}
          />
          {errors.name && (
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.name}</Typography>
          )}

          {/* Email Field */}
          <Typography variant="subtitle2" sx={{ color: "#666" }}>
            Email
          </Typography>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            placeholder="Enter your email"
            type="email"
            error={!!errors.email}
            sx={{ mb: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", py: 0.5 } }}
          />
          {errors.email && (
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.email}</Typography>
          )}

          {/* WhatsApp Number Field */}
          <Typography variant="subtitle2" sx={{ color: "#666" }}>
            WhatsApp Number
          </Typography>
          <TextField
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            fullWidth
            placeholder="Enter your WhatsApp number"
            type="tel"
            error={!!errors.whatsappNumber}
            sx={{ mb: 1, "& .MuiOutlinedInput-root": { borderRadius: "10px", py: 0.5 } }}
          />
          {errors.whatsappNumber && (
            <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.whatsappNumber}</Typography>
          )}

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
            onClick={handleSubmit}
            disabled={loading}
          >
            CONFIRM DETAILS
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MockInterviewSection;