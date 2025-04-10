"use client";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ScheduleInterviewForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [selectedField, setSelectedField] = useState("");

  const fields = [
    "Data Analyst",
    "Business Analyst",
    "Full Stack Development",
    "Mobile Development",
  ];

  const handleScheduleInterview = (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      user_email: email,
      mobile,
      interview_time: interviewTime,
      selected_field: selectedField,
      message: `Interview scheduled for ${interviewTime} in ${selectedField}`,
    };

    emailjs
      .send("service_v6d74tp", "template_84dljhv", templateParams, "092jVXMJK7cGcoq0Q")
      .then(() => {
        alert("Interview Scheduled! Check your email for confirmation.");
        setName("");
        setEmail("");
        setMobile("");
        setInterviewTime("");
        setSelectedField("");
      })
      .catch(() => {
        alert("Failed to schedule interview. Please try again.");
      });
  };

  return (
    <Container
      id="schedule-interview"
      sx={{
        textAlign: "center",
        mt: 8,
        p: 4,
        background: "#106861",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" fontWeight={700} color="white">
        Schedule an Interview
      </Typography>

      <Box
        component="form"
        onSubmit={handleScheduleInterview}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
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
            <MenuItem key={index} value={field}>
              {field}
            </MenuItem>
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
          InputLabelProps={{ shrink: true }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            background: "#ffffff",
            color: "#106861",
            fontWeight: "bold",
            px: 4,
          }}
        >
          Schedule Interview
        </Button>
      </Box>
    </Container>
  );
}
