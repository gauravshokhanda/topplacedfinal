"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "@/app/config/apiConfig";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Chip,
  Divider,
  Tooltip,
  Fade,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function StudentJobCard() {
  const [student, setStudent] = useState(null);
  const { user, token } = useSelector((state) => state.studentAuth);

  console.log("User from Redux:", user, token);

  useEffect(() => {
    const fetchJobCard = async () => {
      if (!user?.id || !token) return;
      try {
        const response = await API.get(`jobcards/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(response.data);
      } catch (err) {
        console.error("Error fetching job card", err);
      }
    };

    fetchJobCard();
  }, [user, token]);

  if (!student) return <p>Loading job card...</p>;

  return (
    <Card
      elevation={4}
      sx={{
        maxWidth: 540,
        mx: "auto",
        p: 4,
        borderRadius: 6,
        background: "#f8fffe",
        boxShadow: "0 20px 45px rgba(0, 110, 110, 0.18)",
        border: "1px solid #0A6E6E15",
        transition: "transform 0.3s ease",
        '&:hover': { transform: "scale(1.015)" },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar
            src={student.photo || "/avatar.png"}
            sx={{ width: 80, height: 80, border: "3px solid #0A6E6E", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
          />
          <Box>
            <Typography variant="h5" fontWeight={800} color="#0A6E6E">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {student.subtitle || "Student"}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <StarIcon sx={{ color: "#0A6E6E", fontSize: 26 }} />
          <Typography variant="h6" fontWeight={700} color="#0A6E6E">
            {student.rating}
          </Typography>
          <Tooltip title="Top Performer" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
            <EmojiEventsIcon sx={{ color: "gold", fontSize: 22 }} />
          </Tooltip>
        </Box>

        <Typography
          variant="body2"
          mb={3}
          fontStyle="italic"
          color="text.primary"
          sx={{
            background: "#e0fdfb",
            p: 2,
            borderRadius: 2,
            borderLeft: "4px solid #0A6E6E",
            boxShadow: "inset 0 0 5px rgba(10,110,110,0.1)"
          }}
        >
          “{student.feedback}”
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          {[
            { label: 'Academic Performance', value: student.academicPerformance },
            { label: 'Attendance', value: student.attendance },
            { label: 'Communication', value: student.communication },
            { label: 'Teamwork', value: student.teamwork },
            { label: 'Technical Skills', value: student.technicalSkills },
            { label: 'Progress', value: student.progress }
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Typography
                variant="subtitle2"
                gutterBottom
                fontWeight={600}
                color="#0A6E6E"
              >
                {item.label}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={item.value || 0}
                sx={{
                  height: 10,
                  borderRadius: 6,
                  backgroundColor: "#e0f2f1",
                  '& .MuiLinearProgress-bar': {
                    background: "linear-gradient(to right, #0A6E6E, #33c3b9)"
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {item.value || 0}%
              </Typography>
            </Grid>
          ))}

          <Grid item xs={6}>
            <Typography variant="subtitle2" fontWeight={600} color="#0A6E6E">
              Total Projects
            </Typography>
            <Chip label={`${student.totalProjects || 0} Projects`} color="primary" variant="outlined" sx={{ mt: 1 }} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" fontWeight={600} color="#0A6E6E">
              Mentor
            </Typography>
            <Chip label={student.mentor || "Unknown"} sx={{ mt: 1, background: "#0A6E6E", color: "white" }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
