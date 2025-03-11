"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
  Rating,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateCalendar } from "@mui/x-date-pickers";
import moment from "moment";

// Available fields
const fields = ["Software Engineering", "Data Science", "Product Management", "Cybersecurity", "Cloud Computing"];

// Mock time slots (replace with real API later)
const timeSlots = {
  "2025-02-14": ["10:00 AM", "11:30 AM", "2:00 PM"],
  "2025-02-15": ["9:00 AM", "12:00 PM", "3:30 PM"],
  "2025-02-16": ["10:00 AM", "1:00 PM", "4:30 PM"],
};

export default function StudentBooking() {
  const [selectedField, setSelectedField] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [description, setDescription] = useState("");
  const [ratings, setRatings] = useState({
    communication: 3,
    resume: 3,
    problemSolving: 3,
    speaking: 3,
  });

  // Handle Field Selection
  const handleFieldChange = (event) => setSelectedField(event.target.value);

  // Handle Date Selection
  const handleDateSelect = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setAvailableTimes(timeSlots[formattedDate] || []);
    setSelectedTime(null);
  };

  // Handle Time Selection
  const handleTimeSelect = (time) => setSelectedTime(time);

  // Final Submission
  const handleSubmit = () => {
    console.log("Booking Details:", {
      field: selectedField,
      date: selectedDate ? moment(selectedDate).format("MMMM Do YYYY") : "Not Selected",
      time: selectedTime,
      description,
      ratings,
    });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1100px", mx: "auto", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        Mock Interview Booking
      </Typography>

      <Grid container spacing={4}>
        {/* Right Side - All Components */}
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 4, boxShadow: 5 }}>
            
            {/* Section 1: Choose Field */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Select Your Field
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Select Field</InputLabel>
                <Select value={selectedField} onChange={handleFieldChange}>
                  {fields.map((field, index) => (
                    <MenuItem key={index} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Section 2: Select Date & Time */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Select Date & Time
              </Typography>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <DateCalendar value={moment(selectedDate)} onChange={handleDateSelect} disablePast />
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                      <Typography variant="body1" fontWeight="bold">
                        Available Time Slots
                      </Typography>
                      <List>
                        {availableTimes.length > 0 ? (
                          availableTimes.map((time, index) => (
                            <ListItem
                              key={index}
                              selected={selectedTime === time}
                              onClick={() => handleTimeSelect(time)}
                              sx={{
                                backgroundColor: selectedTime === time ? "#2575fc" : "transparent",
                                borderRadius: 1,
                                "&:hover": { backgroundColor: "#2575fc", color: "white" },
                              }}
                            >
                              <ListItemText primary={time} />
                            </ListItem>
                          ))
                        ) : (
                          <Typography>No available slots.</Typography>
                        )}
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Box>

            {/* Section 3: Add Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Add a Description
              </Typography>
              <TextField fullWidth multiline rows={4} placeholder="Enter any specific requests..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </Box>

            {/* Section 4: Self-Rating */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Rate Yourself
              </Typography>
              {Object.keys(ratings).map((category) => (
                <Box key={category} sx={{ mb: 2 }}>
                  <Typography>{category.replace(/([A-Z])/g, " $1")}</Typography>
                  <Rating value={ratings[category]} onChange={(e, newValue) => setRatings({ ...ratings, [category]: newValue })} />
                </Box>
              ))}
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Confirm Booking
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
