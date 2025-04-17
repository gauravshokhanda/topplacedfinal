'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import Image from 'next/image';

export default function TeacherHome() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#0A6E6E', width: '100%', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 4,
              boxShadow: 6,
              borderRadius: 4,
              bgcolor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              src="/assets/images/profile.png"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" color="#0A6E6E">
              John Doe
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Senior Software Engineer
            </Typography>
            <Rating value={4.5} readOnly sx={{ my: 1 }} />

            <Divider sx={{ width: '100%', my: 2 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Experience:</strong> 10+ years
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Company:</strong> Google
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Specialization:</strong> System Design, Algorithms
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Python', 'JavaScript', 'AWS'].map((tech, i) => (
                  <Chip
                    key={i}
                    label={tech}
                    sx={{
                      m: 0.5,
                      bgcolor: '#0A6E6E',
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Button
              variant="contained"
              href="/profile"
              sx={{
                mt: 3,
                backgroundColor: '#0A6E6E',
                '&:hover': {
                  backgroundColor: '#075A5A',
                },
              }}
            >
              View Full Profile
            </Button>
          </Card>
        </Grid>

        {/* Mentors Section */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              boxShadow: 6,
              borderRadius: 4,
              bgcolor: '#ffffff',
              height: '100%',
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="#0A6E6E" gutterBottom>
              Mentors Available
            </Typography>
            <List>
              {[
                { name: 'Alice Johnson', company: 'Google', avatar: '/assets/images/mentor1.png' },
                { name: 'Michael Smith', company: 'Amazon', avatar: '/assets/images/mentor2.png' },
                { name: 'Sarah Brown', company: 'Microsoft', avatar: '/assets/images/mentor3.png' },
                { name: 'David Lee', company: 'Meta', avatar: '/assets/images/mentor4.png' },
              ].map((mentor, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar src={mentor.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={mentor.name}
                    secondary={mentor.company}
                  />
                </ListItem>
              ))}
            </List>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                borderColor: '#0A6E6E',
                color: '#0A6E6E',
                '&:hover': {
                  backgroundColor: '#0A6E6E',
                  color: '#fff',
                  borderColor: '#0A6E6E',
                },
              }}
            >
              View All Mentors
            </Button>
          </Card>
        </Grid>

        {/* Banner Section */}
        <Grid item xs={12}>
          <Card
            sx={{
              boxShadow: 6,
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              height: { xs: 300, md: 400 },
            }}
          >
            <Image
              src="/assets/images/interview-banner.jpg"
              fill
              alt="Interview Banner"
              style={{ objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                textAlign: 'center',
                px: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                Prepare for Your Next Interview
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                Get expert guidance to ace your job interviews.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: '#ffffff',
                  color: '#0A6E6E',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
                href="/book"
              >
                Book a Session
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
