// pages/index.js
import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
});

const WelcomeBox = styled(Paper)(({ isLogin }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.5s ease',
  padding: '20px',
  backgroundColor: '#f0f4f8',
  transform: isLogin ? 'translateX(0)' : 'translateX(100%)',
}));

const FormBox = styled(Paper)(({ isLogin }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.5s ease',
  transform: isLogin ? 'translateX(0)' : 'translateX(-100%)',
}));

const FormContainer = styled(Box)({
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px',
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container>
      <WelcomeBox elevation={3} isLogin={isLogin}>
        <Typography variant="h4" gutterBottom>
          {isLogin ? 'Welcome Back!' : 'Join Us!'}
        </Typography>
        <Typography variant="body1">
          {isLogin
            ? 'Sign in to continue your journey'
            : 'Create an account to get started'}
        </Typography>
      </WelcomeBox>

      <FormBox elevation={3} isLogin={isLogin}>
        {isLogin ? (
          <FormContainer>
            <Typography variant="h5" gutterBottom>
              Sign In
            </Typography>
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <Button
                color="primary"
                onClick={toggleAuth}
                sx={{ textTransform: 'none', padding: 0 }}
              >
                Sign Up
              </Button>
            </Typography>
          </FormContainer>
        ) : (
          <FormContainer>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <TextField label="Full Name" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
            <Typography variant="body2">
              Already have an account?{' '}
              <Button
                color="primary"
                onClick={toggleAuth}
                sx={{ textTransform: 'none', padding: 0 }}
              >
                Sign In
              </Button>
            </Typography>
          </FormContainer>
        )}
      </FormBox>
    </Container>
  );
}