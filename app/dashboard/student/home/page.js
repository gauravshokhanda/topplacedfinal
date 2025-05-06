import React from 'react';
import {
  Box, Grid, Typography, Card, CardContent, Button, LinearProgress,
  Avatar, List, ListItem, ListItemText, ListItemIcon, Divider, Chip, IconButton
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';

export default function MentorSetupPage() {
  const steps = [
    { title: 'Setup Your Mentor Profile', completed: true },
    { title: 'Setup Your Mentorship Pricing', completed: false },
    { title: 'Setup Your Trial Call Preferences', completed: false },
    { title: 'Setup Your Availability', completed: false },
    { title: 'Create a Mentorship Curriculum', completed: false },
  ];

  const mentors = [
    { name: 'Nandita Kalita', company: 'Rubrik. Inc.' },
    { name: 'Pushkar Dubey', company: 'Physics Wallah (PW)' },
    { name: 'Aanchal Patial', company: 'Salesforce' },
  ];

  return (
    <Box sx={{ p: { xs: 4, md: 4 }, minHeight: '100vh' }}>
      <Grid container spacing={8} >
        {/* LEFT SIDE */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ fontSize: 22, fontWeight: 600 ,marginBottom: 2}}>
            Finish Setting Up Your Mentor Profile
          </Typography>
          <Typography sx={{ color: '#9D9D9D', mb: 4, fontSize: 14 }}>
            Kickstart mentoring with a mentor profile you create and love. 💙
          </Typography>

          <Box sx={{ position: 'relative', mb: 3, }}>
            {/* Floating Centered Chip */}
            <Chip
              label="New Feature"
              size="small"
              sx={{
                position: 'absolute',
                top: -8,
                left: '18%',
                transform: 'translateX(-50%)',
                backgroundColor: '#00C472',
                color: '#fff',
                borderRadius: '20px',
                height: 20,
                px: 2,
                fontSize: 10,
                zIndex: 10,
              }}
            />

            {/* Actual Card */}
            <Card sx={{ background: '#F0FFF7', border: '1px solid #E1F5EC', borderRadius: 0, boxShadow: 'none' }}>
              <CardContent sx={{ pt: 4 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, mb: 1 }}>
                  Introducing Same Day Trial Bookings!
                </Typography>
                <Typography sx={{ fontSize: 13, color: '#444', mb: 2 }}>
                  Mentees can now book same-day trial sessions with mentors who have enabled the instant trial booking feature.
                  By opting in for instant trial bookings, you make it more convenient for mentees to connect with you quickly,
                  increasing the chances of receiving more trial bookings.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000',
                      borderColor: '#ddd',
                      px: 4,
                      fontWeight: 500,
                      textTransform: 'none',
                      borderRadius: 0,
                      width: { xs: '100%', sm: '45%' }, // ✅ 100% on mobile, auto on desktop
                    }}
                  >
                    Know More
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#000',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 500,
                      textTransform: 'none',
                      borderRadius: 0,
                      width: { xs: '100%', sm: '55%' },
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                    }}
                  >
                    Set Time Before Trial Booking
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>


          <Typography fontWeight={500} sx={{ display: 'flex', mb: 1, justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '14px' }}>33% complete</Typography>   <Typography component="span" color="error" sx={{ fontWeight: 500, fontSize: '13px' }}>(1/3) Completed</Typography>
          </Typography>
          <LinearProgress variant="determinate" color='error' value={33} sx={{ height: 6, borderRadius: 5, my: 2 }} />

          <Card
            sx={{
              backgroundColor: '#ECF9FF',
              border: '1px solid rgb(201, 228, 249)',
              borderRadius: 2,
              p: 2,
              mb: 3,
              position: 'relative',
              boxShadow: 'none',
              maxHeight: '162px',
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Header Row */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PauseCircleOutlineIcon sx={{ mr: 1,ml:2 }} />
                <Typography sx={{ fontWeight: 600, fontSize: 16, ml: 1 }}>
                  Profile on Hold
                </Typography>
                <InfoOutlinedIcon sx={{ fontSize: 18, color: '#6c757d' }} />
              </Box>

              {/* Description */}
              <Box sx={{ display: 'flex', justifyContent: 'align-between', mb: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#111', fontWeight:400, mb: 1.5 }}>
                    We will be waitlisting your profile for now and will be reaching you out very soon whenever we’re ready to list you on the platform.
                  </Typography>

                  {/* Bold Line */}
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#111', mb: 2 }}>
                    Please reach out to Support Team if you would like to get further clarification
                  </Typography>

                </Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#0B0B0C',
                    color: '#fff',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1,
                    fontSize: 14,
                    height: 55,
                    '&:hover': {
                      backgroundColor: '#000',
                    },
                  }}
                  endIcon={<NorthEastIcon sx={{ fontSize: 16 }} />}
                >
                  Contact Support
                </Button>

              </Box>

            </CardContent>
          </Card>


          {/* Next Steps Checklist */}
          <Typography sx={{ mb: 1, fontSize: '15px' }}>Next Steps</Typography>

          <Box sx={{ px: 2, py: 4 }}>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: '#F5F5F5',
                  width: 40,
                  height: 40,
                  mr: 2,
                  borderRadius: 2,
                }}
              >
                <AccountCircleOutlinedIcon sx={{ color: '#1a1a1a' }} />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight={700} sx={{ fontSize: '15px' }}>Create Your Mentor Profile</Typography>
                <Typography fontSize={12} color="#6D7D8C">
                  You have successfully created your account
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#E6F9F0', 
                  border: '2px solid #00C472', // green border
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckIcon sx={{ color: '#00C472', fontSize: 20 }} />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Section 2 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: '#F5F5F5',
                  width: 40,
                  height: 40,
                  mr: 2,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#F5F5F5', // Light gray background
                    borderRadius: 2,     // Slightly rounded corners
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TuneOutlinedIcon sx={{ fontSize: 20, color: '#1a1a1a' }} />
                </Box>
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight={700} >Setting Up Your Long Term Mentorship</Typography>
                <Typography fontSize={12} color="#6D7D8C">
                  Let’s get started with these essential setup steps.
                </Typography>
              </Box>
              <Typography fontSize={13} fontWeight={600}>
                0/5
              </Typography>
            </Box>

            <List dense disablePadding sx={{ ml: 4, my: 2 }}>
              {steps.map((step, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    step.completed ? (
                      <IconButton edge="end" size="small">
                        <OpenInNewIcon fontSize="50px" />
                      </IconButton>
                    ) : (
                      <IconButton edge="end" disabled>
                        <LockOutlinedIcon fontSize="small" />
                      </IconButton>
                    )
                  }
                  sx={{
                    py: 1,
                    pl: 0,
                    opacity: step.completed ? 1 : 0.5,
                    borderBottom: index < steps.length - 1 ? '1px solid #eee' : 'none',
                  }}
                >
                  <ListItemText
                    primary={step.title}
                    primaryTypographyProps={{
                      fontSize: 12,
                      fontWeight: step.completed ? 600 : 400,
                    }}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Section 3 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: '#F5F5F5',
                  width: 48,
                  height: 48,
                  mr: 2,
                  borderRadius: 2,
                }}
              >
                <VerifiedOutlinedIcon sx={{ color: '#1a1a1a' }} />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight={700}>Get Verified & Listed</Typography>
                <Typography fontSize={13} color="text.secondary">
                  Please complete above steps before booking a verification
                </Typography>
              </Box>
              <LockOutlinedIcon sx={{ fontSize: 18, color: '#999' }} />
            </Box>
          </Box>

        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={12} md={5} >
          <Card sx={{boxShadow: 'none',borderBottom:'1px solid #E5EAF1'}}>
            <CardContent>
              <Typography fontWeight={600}>Get Inspired From Mentor Profiles</Typography>
              <Typography fontSize={12} sx={{ color: '#6D7D8C' }}>Get Inspired From Mentor Profiles</Typography>
              {mentors.map((mentor, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }} />
                  <Box>
                    <Typography>{mentor.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{mentor.company}</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '1px solid #E5EAF1',
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.06)',
                      marginLeft: 'auto',
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 18, color: '#1A1A1A' }} />
                  </Box>
                </Box>
              ))}
              <Typography
                variant="body2"
                color="inherit"
                sx={{
                  mt: 2,
                  border: '1px solid #E5EAF1',
                  backgroundColor: '#fff',
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.06)',
                  textAlign: 'center',
                  padding: '8px 16px',
                  color:'inherit',
                  cursor: 'pointer',  
                  borderRadius: '4px',
                  '&:hover': {
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
                  },
                }}>
                View More Similar Profiles →
              </Typography>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography fontWeight={600}>Feeling Stuck? Need Assistance?</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Reach out to your POC anytime.
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">Dhruva Biradar</Typography>
              <Typography variant="body2" color="primary">+91 9689039801</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
