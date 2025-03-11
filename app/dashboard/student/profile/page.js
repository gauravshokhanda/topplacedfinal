"use client";

import { useState } from "react";
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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";

export default function ProfileStudent() {
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Aspiring Software Engineer with a passion for full-stack development.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [importedLinkedInData, setImportedLinkedInData] = useState(null);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle Resume Upload
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  // Handle Input Change for Student Info
  const handleInputChange = (e) => {
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle LinkedIn Import (Mock Function)
  const importFromLinkedIn = () => {
    if (!linkedinUrl) {
      alert("Please enter a valid LinkedIn URL.");
      return;
    }
    // Mock importing data (Replace this with actual API call)
    setImportedLinkedInData({
      name: "John Doe (LinkedIn)",
      email: "johndoe@linkedin.com",
      bio: "Software Engineer with 3+ years experience at Google.",
      linkedinUrl: linkedinUrl,
    });
    setOpenModal(true);
  };

  return (
    <Box sx={{ maxWidth: "1100px", mx: "auto", mt: 4 }}>
      <Grid container spacing={4}>
        {/* Left Section - Profile */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 4, boxShadow: 5 }}>
            <Typography variant="h5" fontWeight="bold">
              Profile
            </Typography>
            {/* Profile Image Upload */}
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Avatar
                src={profileImage}
                sx={{ width: 120, height: 120, mx: "auto", border: "3px solid white" }}
              />
              <input type="file" accept="image/*" hidden id="profile-upload" onChange={handleImageUpload} />
              <label htmlFor="profile-upload">
                <IconButton component="span">
                  <EditIcon />
                </IconButton>
              </label>
            </Box>

            {/* Profile Info */}
            {isEditing ? (
              <>
                <TextField fullWidth name="name" value={studentInfo.name} onChange={handleInputChange} sx={{ mb: 2 }} />
                <TextField fullWidth name="email" value={studentInfo.email} onChange={handleInputChange} sx={{ mb: 2 }} />
                <TextField fullWidth multiline rows={3} name="bio" value={studentInfo.bio} onChange={handleInputChange} />
                <Button startIcon={<SaveIcon />} onClick={toggleEdit} variant="contained" sx={{ mt: 2 }}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6">{studentInfo.name}</Typography>
                <Typography color="textSecondary">{studentInfo.email}</Typography>
                <Typography sx={{ mt: 1 }}>{studentInfo.bio}</Typography>
                <Button startIcon={<EditIcon />} onClick={toggleEdit} variant="outlined" sx={{ mt: 2 }}>
                  Edit Profile
                </Button>
              </>
            )}
          </Card>
        </Grid>

        {/* Right Section - Resume Upload & LinkedIn Import */}
        <Grid item xs={12} md={4}>
          {/* Resume Upload */}
          <Card sx={{ p: 3, mb: 3, boxShadow: 5 }}>
            <Typography variant="h6" fontWeight="bold">
              Upload Resume
            </Typography>
            <input type="file" accept=".pdf" hidden id="resume-upload" onChange={handleResumeUpload} />
            <label htmlFor="resume-upload">
              <Button startIcon={<CloudUploadIcon />} variant="contained" component="span" sx={{ mt: 2 }}>
                Upload Resume
              </Button>
            </label>
            {resume && (
              <Box sx={{ mt: 2 }}>
                <InsertDriveFileIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                <Typography display="inline">{resume.name}</Typography>
              </Box>
            )}
          </Card>

          {/* LinkedIn Import */}
          <Card sx={{ p: 3, boxShadow: 5 }}>
            <Typography variant="h6" fontWeight="bold">
              Import from LinkedIn
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter LinkedIn Profile URL"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              startIcon={<LinkedInIcon />}
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#0077b5" }}
              onClick={importFromLinkedIn}
            >
              Import Profile
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* LinkedIn Import Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 4,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
            borderRadius: "10px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">LinkedIn Profile Imported</Typography>
            <IconButton onClick={() => setOpenModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {importedLinkedInData && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">{importedLinkedInData.name}</Typography>
              <Typography color="textSecondary">{importedLinkedInData.email}</Typography>
              <Typography sx={{ mt: 1 }}>{importedLinkedInData.bio}</Typography>
              <Typography sx={{ mt: 1, fontWeight: "bold" }}>LinkedIn URL:</Typography>
              <Typography sx={{ color: "#0077b5" }}>{importedLinkedInData.linkedinUrl}</Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
