'use client';

import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Link,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { API } from '@/app/config/apiConfig';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const token = useSelector((state) => state.studentAuth.token);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const student = user?.profile?.studentDetails || {};
  const techSkills = student.technicalSkills || [];
  const softSkills = student.softSkills || [];
  const certifications = student.certifications || [];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0A6E6E',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        py: 6,
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1000px' }}>
        {/* Header */}
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Avatar
                src={student.image}
                alt={user.name}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="h4" color="#0A6E6E">{user.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {student.position} @ {student.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.education}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Info Cards */}
        <Grid container spacing={3}>
          <ProfileCard title="Feedback" content={student.feedback || 'N/A'} />
          <ProfileCard title="Rating" content={student.rating || 'N/A'} />
          <ProfileCard title="Academic Performance" content={student.academicPerformance} />
          <ProfileCard title="Phone" content={student.phone} />
          <ProfileCard title="WhatsApp" content={student.whatsapp} />
          <ProfileCard title="LinkedIn URL" content={student.linkedinUrl} />
          <ProfileCard title="Location" content={student.location} />
          <ProfileCard title="Looking For" content={student.lookingFor} />
          <ProfileCard title="Total Experience" content={student.totalExperience} />
          <ProfileCard title="Working" content={student.working ? 'Yes' : 'No'} />
          <ProfileCard title="Resume">
            <Link href={student.resume} target="_blank" rel="noreferrer" underline="hover">
              View Resume
            </Link>
          </ProfileCard>
          <ProfileCard title="Portfolio">
            <Link href={student.portfolio} target="_blank" rel="noreferrer" underline="hover">
              {student.portfolio}
            </Link>
          </ProfileCard>
          <ProfileCard title="Technical Skills" list={techSkills} />
          <ProfileCard title="Soft Skills" list={softSkills} />
          <ProfileCard title="Certifications" list={certifications} />
        </Grid>
      </Box>
    </Box>
  );
}

function ProfileCard({ title, content, list, children }) {
  return (
    <Grid item xs={12} sm={6}>
      <Card elevation={4} sx={{ borderRadius: 3, height: '100%' }}>
        <CardContent>
          <Typography variant="h6" color="#0A6E6E" gutterBottom>
            {title}
          </Typography>
          {content && <Typography>{content}</Typography>}
          {list && (
            <List dense>
              {list.map((item, idx) => (
                <ListItem key={idx} sx={{ py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
}
