"use client";

import { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, Grid, Card, Avatar, Button, TextField, CircularProgress, Snackbar,
  Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from 'react-redux';
import { API } from '@/app/config/apiConfig';

const initialInfo = {
  name: '',
  email: '',
  bio: '',
  location: '',
  education: '',
  experience: '',
  company: '',
  academicPerformance: '',
  linkedinUrl: '',
  position: '',
  phone: '',
  whatsapp: '',
  totalExperience: '',
  lookingFor: '',
  technicalSkills: '',
  softSkills: '',
  certifications: '',
  working: false,
};

export default function ProfileStudent() {
  const token = useSelector((state) => state.studentAuth.token);
  const [studentInfo, setStudentInfo] = useState(initialInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [studentId, setStudentId] = useState(null); // ✅ Store for assign-role API

  const imageRef = useRef();
  const resumeRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        const details = data.profile?.studentDetails || {};
        setStudentId(data._id); // ✅ store ID
        setStudentInfo({
          ...initialInfo,
          name: data.name,
          email: data.email,
          ...details,
          bio: details.bio || '',
          technicalSkills: details.technicalSkills?.join(', ') || '',
          softSkills: details.softSkills?.join(', ') || '',
          certifications: details.certifications?.join(', ') || '',
        });
        if (details.image) setProfileImageUrl(details.image);
        if (details.resume) setResumeUrl(details.resume);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value });
  };

  const uploadFile = async (type, fileRef) => {
    const file = fileRef.current?.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(type, file);

    try {
      const res = await API.put('auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const updated = res.data.profile?.studentDetails || {};
      if (updated.image) setProfileImageUrl(updated.image);
      if (updated.resume) setResumeUrl(updated.resume);
      setSnackbarOpen(true);
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { ...studentInfo };

      ['technicalSkills', 'softSkills', 'certifications'].forEach((key) => {
        if (typeof payload[key] === 'string') {
          payload[key] = JSON.stringify(
            payload[key]
              .split(',')
              .map((item) => item.trim())
              .filter((item) => item.length > 0)
          );
        }
      });

      // ✅ Save profile first
      await API.put('auth/profile', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Assign jobRoleId using position
      if (studentInfo.position && studentId) {
        await API.put(`students/assign-role/${studentId}`, {
          position: studentInfo.position,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setSnackbarOpen(true);
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', my: 4, px: 2 }}>
      <Card sx={{ p: 4, boxShadow: 3, borderRadius: 6, bgcolor: '#fdfefe', border: '1px solid #e0f2f1' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Avatar
                src={profileImageUrl}
                sx={{
                  width: 140,
                  height: 140,
                  mx: 'auto',
                  border: '4px solid #0A6E6E',
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
                onClick={() => imageRef.current?.click()}
              />
              <input hidden type="file" accept="image/*" ref={imageRef} onChange={() => uploadFile('image', imageRef)} />
              <Typography variant="body2" sx={{ mt: 1, color: '#0A6E6E' }}>Tap to upload image</Typography>
              <Button startIcon={<CloudUploadIcon />} variant="outlined" fullWidth sx={{ mt: 2, color: '#0A6E6E', borderColor: '#0A6E6E' }} onClick={() => resumeRef.current?.click()}>
                Upload Resume
              </Button>
              <input hidden ref={resumeRef} type="file" accept="application/pdf" onChange={() => uploadFile('resume', resumeRef)} />
              {resumeUrl && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0A6E6E' }}>
                    View Uploaded Resume
                  </a>
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" color="#0A6E6E">My Profile</Typography>
              {!isEditing && (
                <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setIsEditing(true)} sx={{ borderColor: '#0A6E6E', color: '#0A6E6E' }}>
                  Edit
                </Button>
              )}
            </Box>

            <Grid container spacing={2}>
              {Object.entries(studentInfo).map(([key, value]) => {
                if (key === 'image' || key === 'resume') return null;

                if (key === 'experience') {
                  return (
                    <Grid item xs={12} sm={6} key={key}>
                      <FormControl fullWidth disabled={!isEditing}>
                        <InputLabel id="experience-label">Experience (Years)</InputLabel>
                        <Select
                          labelId="experience-label"
                          name="experience"
                          value={studentInfo.experience || ''}
                          onChange={handleInputChange}
                          label="Experience (Years)"
                        >
                          {[...Array(21).keys()].map((year) => (
                            <MenuItem key={year} value={String(year)}>
                              {year} {year === 1 ? 'year' : 'years'}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                }

                if (key === 'working') {
                  return (
                    <Grid item xs={12} sm={6} key={key}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!!studentInfo.working}
                            onChange={(e) =>
                              setStudentInfo({ ...studentInfo, working: e.target.checked })
                            }
                            disabled={!isEditing}
                          />
                        }
                        label="Currently Working?"
                      />
                    </Grid>
                  );
                }

                return (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      name={key}
                      label={key.replace(/([A-Z])/g, ' $1')}
                      fullWidth
                      value={value || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      InputLabelProps={{ style: { color: '#37474f' } }}
                      InputProps={{ style: { backgroundColor: '#ffffff', borderRadius: 8 } }}
                    />
                  </Grid>
                );
              })}
            </Grid>

            {isEditing && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  onClick={handleSave}
                  disabled={loading}
                  sx={{ backgroundColor: '#0A6E6E' }}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setIsEditing(false)} sx={{ borderColor: '#0A6E6E', color: '#0A6E6E' }}>
                  Cancel
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)} message="Profile updated successfully" />
    </Box>
  );
}
