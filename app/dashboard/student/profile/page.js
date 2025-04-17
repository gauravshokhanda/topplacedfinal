'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
  Button,
  TextField,
  IconButton,
  Modal,
  Divider,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function ProfileStudent() {
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [studentInfo, setStudentInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Aspiring Software Engineer with a passion for full-stack development and open-source contributions.',
    location: 'Bangalore, India',
    education: 'B.Tech in Computer Science, NIT Trichy',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  });

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  // Resume Upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file);
  };

  // Input Change
  const handleInputChange = (e) => {
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: '1100px', mx: 'auto', my: 4, px: 2 }}>
      <Grid container spacing={4}>
        {/* Left - Main Profile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4, boxShadow: 6, borderRadius: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  src={profileImage}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 1, border: '4px solid #0A6E6E' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="profile-upload"
                  onChange={handleImageUpload}
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={studentInfo.name}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={studentInfo.email}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      multiline
                      rows={3}
                      value={studentInfo.bio}
                      onChange={handleInputChange}
                    />
                    <Button
                      startIcon={<SaveIcon />}
                      onClick={() => setIsEditing(false)}
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: '#0A6E6E' }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h5" fontWeight="bold" color="#0A6E6E">
                      {studentInfo.name}
                    </Typography>
                    <Typography color="text.secondary">{studentInfo.email}</Typography>
                    <Typography sx={{ mt: 1 }}>{studentInfo.bio}</Typography>
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() => setIsEditing(true)}
                      variant="outlined"
                      sx={{ mt: 2, borderColor: '#0A6E6E', color: '#0A6E6E' }}
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Additional Details */}
            <Typography variant="subtitle1" fontWeight="bold" color="#0A6E6E">
              Location
            </Typography>
            <Typography sx={{ mb: 2 }}>{studentInfo.location}</Typography>

            <Typography variant="subtitle1" fontWeight="bold" color="#0A6E6E">
              Education
            </Typography>
            <Typography sx={{ mb: 2 }}>{studentInfo.education}</Typography>

            <Typography variant="subtitle1" fontWeight="bold" color="#0A6E6E">
              Skills
            </Typography>
            <Box sx={{ mt: 1 }}>
              {studentInfo.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{
                    m: 0.5,
                    backgroundColor: '#0A6E6E',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Right - Resume Upload */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: 6, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" color="#0A6E6E">
              Resume
            </Typography>
            <input
              type="file"
              accept=".pdf"
              hidden
              id="resume-upload"
              onChange={handleResumeUpload}
            />
            <label htmlFor="resume-upload">
              <Button
                startIcon={<CloudUploadIcon />}
                variant="contained"
                component="span"
                sx={{ mt: 2, backgroundColor: '#0A6E6E' }}
              >
                Upload Resume
              </Button>
            </label>
            {resume && (
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <InsertDriveFileIcon sx={{ mr: 1 }} />
                <Typography>{resume.name}</Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
