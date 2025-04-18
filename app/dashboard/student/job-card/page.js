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
} from '@mui/material';

export default function ProfilePage() {
  const person = {
    name: 'John Doe',
    position: 'Senior Software Engineer',
    feedback: 'John is an exceptional developer, consistently delivering top-quality solutions.',
    rating: 4.8,
    company: 'Google Inc.',
    college: 'Stanford University',
    profileImage: 'https://randomuser.me/api/portraits/men/75.jpg',
    techSkills: ['JavaScript', 'React', 'Node.js', 'GraphQL'],
    softSkills: ['Teamwork', 'Communication', 'Leadership'],
    hardSkills: ['Data Structures', 'Algorithms', 'System Design'],
    academicPerformance: 'Graduated in top 5% with a CGPA of 9.2/10',
    extraCurricular: 'Led tech events and coding bootcamps',
    portfolio: 'https://johndoe.dev',
  };

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
        {/* Profile Header */}
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Avatar
                src={person.profileImage}
                alt={person.name}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="h4" color="#0A6E6E">{person.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {person.position} @ {person.company}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {person.college}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Profile Sections */}
        <Grid container spacing={3}>
          <ProfileCard title="Feedback" content={person.feedback} />
          <ProfileCard title="Rating" content={`${person.rating} / 5`} />
          <ProfileCard title="Academic Performance" content={person.academicPerformance} />
          <ProfileCard title="Extra-Curricular Contributions" content={person.extraCurricular} />
          <ProfileCard title="Portfolio">
            <Link href={person.portfolio} target="_blank" rel="noreferrer" underline="hover">
              {person.portfolio}
            </Link>
          </ProfileCard>
          <ProfileCard title="Technical Skills" list={person.techSkills} />
          <ProfileCard title="Soft Skills" list={person.softSkills} />
          <ProfileCard title="Hard Skills" list={person.hardSkills} />
        </Grid>
      </Box>
    </Box>
  );
}

// Reusable Card Component
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
              {list.map((item, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
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
