"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Rating,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateCalendar } from "@mui/x-date-pickers";
import moment from "moment";

const fields = ["Software Engineering", "Data Science", "Product Management", "Cybersecurity", "Cloud Computing"];

// Mock time slots (You can replace this with real API data)
const timeSlots = {
  "2024-02-20": ["10:00 AM", "11:30 AM", "2:00 PM"],
  "2024-02-21": ["9:00 AM", "12:00 PM", "3:30 PM"],
  "2024-02-22": ["10:00 AM", "1:00 PM", "4:30 PM"],
};

export default function StudentBooking() {
  const [activeStep, setActiveStep] = useState(0);
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

  const steps = ["Choose Field", "Select Date & Time", "Add Description", "Self-Rating"];

  // Move to the next step with validation
  const handleNext = () => {
    if (activeStep === 0 && !selectedField) {
      alert("Please select a field before proceeding.");
      return;
    }
    if (activeStep === 1 && (!selectedDate || !selectedTime)) {
      alert("Please select a date and time before proceeding.");
      return;
    }
    if (activeStep === 2 && description.trim() === "") {
      alert("Please enter a description before proceeding.");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Move to the previous step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle field selection
  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  // Handle date selection from calendar
  const handleDateSelect = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setAvailableTimes(timeSlots[formattedDate] || []);
    setSelectedTime(null); // Reset selected time when date changes
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Final submission
  const handleSubmit = () => {
    console.log("Booking Details:", {
      field: selectedField,
      date: moment(selectedDate).format("MMMM Do YYYY"),
      time: selectedTime,
      description,
      ratings,
    });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Mock Interview Booking
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ p: 3, mt: 3 }}>
        {/* Step 1: Choose Field */}
        {activeStep === 0 && (
          <>
            <Typography variant="body1" fontWeight="bold">
              Select Your Field:
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Field</InputLabel>
              <Select value={selectedField} onChange={handleFieldChange}>
                {fields.map((field, index) => (
                  <MenuItem key={index} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {/* Step 2: Select Date & Time */}
        {activeStep === 1 && (
          <>
            <Typography variant="body1" fontWeight="bold">
              Select Date & Time:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateSelect}
                    disablePast
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    Available Time Slots:
                  </Typography>
                  <Paper elevation={3} sx={{ mt: 1, p: 2 }}>
                    <List>
                      {availableTimes.length > 0 ? (
                        availableTimes.map((time, index) => (
                          <ListItem
                            key={index}
                            selected={selectedTime === time}
                            onClick={() => handleTimeSelect(time)}
                            sx={{
                              backgroundColor: selectedTime === time ? "#2575fc" : "transparent",
                              color: selectedTime === time ? "white" : "inherit",
                              borderRadius: 1,
                              "&:hover": { backgroundColor: "#2575fc", color: "white" },
                            }}
                          >
                            <ListItemText primary={time} />
                          </ListItem>

                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No available slots for this day.
                        </Typography>
                      )}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </>
        )}

        {/* Step 3: Description Box */}
        {activeStep === 2 && (
          <>
            <Typography variant="body1" fontWeight="bold">
              Add any Queries or Specific Requests:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Enter your concerns (e.g., I want to practice system design, I need help with behavioral questions...)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mt: 2 }}
            />
          </>
        )}

        {/* Step 4: Self-Rating */}
        {activeStep === 3 && (
          <>
            <Typography variant="body1" fontWeight="bold">
              Rate Yourself in the Following Areas:
            </Typography>
            <Box sx={{ mt: 2 }}>
              {Object.keys(ratings).map((category) => (
                <Box key={category} sx={{ mb: 2 }}>
                  <Typography>{category.replace(/([A-Z])/g, " $1")}</Typography>
                  <Rating value={ratings[category]} onChange={(e, newValue) => setRatings({ ...ratings, [category]: newValue })} />
                </Box>
              ))}
            </Box>
          </>
        )}
      </Card>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        {activeStep > 0 && <Button variant="outlined" onClick={handleBack}>Back</Button>}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>Next</Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleSubmit}>Confirm Booking</Button>
        )}
      </Box>
    </Box>
  );
}
