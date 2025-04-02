"use client";
import { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Divider } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import GoogleIcon from '@mui/icons-material/Google';

// Enhanced Theme configuration
const theme = createTheme({
  palette: {
    primary: { main: '#0A6E6E' },
    secondary: { main: '#F5F7FA' },
    background: { default: '#FFFFFF' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h3: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    body1: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover fieldset': { borderColor: '#0A6E6E' },
          },
        },
      },
    },
  },
});

// Styled components
const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(145deg, #F5F7FA 0%, #C3CFE2 100%)",
  padding: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
  },
}));

const DesktopContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  borderRadius: 16,
  overflow: "hidden",
  // boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down('md')]: {
    display: "none",
  },
}));

const MobileContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down('md')]: {
    display: "block",
  },
}));

const WelcomeBox = styled(Paper)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(6),
  background: "linear-gradient(135deg, #0A6E6E 0%, #095C5C 100%)",
  color: "#ffffff",
  transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
}));

const FormBox = styled(Paper)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
  paddingTop: theme.spacing(8), // Increased top padding
}));

const AuthBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  padding: theme.spacing(5),
  paddingTop: theme.spacing(7), // Increased top padding
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2), // Kept reduced space between inputs
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "12px 24px",
  fontWeight: 500,
  transition: "all 0.3s ease",
  '&:hover': {
    boxShadow: "0 4px 12px rgba(10, 110, 110, 0.2)",
  },
}));

const AuthForm = ({ isLogin, toggleAuth, handleGoogleLogin }) => (
  <FormContainer>
    <Typography variant="h5" color="primary">
      {isLogin ? "Sign In" : "Sign Up"}
    </Typography>
    {!isLogin && (
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        autoComplete="name"
      />
    )}
    <TextField
      label="Email"
      variant="outlined"
      fullWidth
      type="email"
      autoComplete="email"
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      fullWidth
      autoComplete={isLogin ? "current-password" : "new-password"}
    />
    <StyledButton variant="contained" color="primary" fullWidth>
      {isLogin ? "Sign In" : "Sign Up"}
    </StyledButton>
    <Divider sx={{ my: 1 }}>or</Divider>
    <StyledButton
      variant="outlined"
      color="primary"
      fullWidth
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
    >
      {isLogin ? "Sign in with Google" : "Sign up with Google"}
    </StyledButton>
    <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
      <Button
        color="primary"
        onClick={toggleAuth}
        sx={{ fontWeight: 500, textTransform: 'none' }}
      >
        {isLogin ? "Sign Up" : "Sign In"}
      </Button>
    </Typography>
  </FormContainer>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuth = () => setIsLogin(prev => !prev);
  const handleGoogleLogin = () => console.log("Google login clicked");

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Desktop Version with Sliding Animation */}
        <DesktopContainer>
          <WelcomeBox sx={{ transform: isLogin ? 'translateX(0)' : 'translateX(100%)' }}>
            <Typography variant="h3" gutterBottom>
              {isLogin ? "Welcome Back!" : "Join Us!"}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: '80%' }}>
              {isLogin ? "Sign in to continue your journey with us" : "Create an account to start exploring"}
            </Typography>
          </WelcomeBox>
          <FormBox sx={{ transform: isLogin ? 'translateX(0)' : 'translateX(-100%)' }}>
            <AuthForm
              isLogin={isLogin}
              toggleAuth={toggleAuth}
              handleGoogleLogin={handleGoogleLogin}
            />
          </FormBox>
        </DesktopContainer>

        {/* Mobile/Tablet Version without Animation */}
        <MobileContainer>
          <AuthBox>
            <AuthForm
              isLogin={isLogin}
              toggleAuth={toggleAuth}
              handleGoogleLogin={handleGoogleLogin}
            />
          </AuthBox>
        </MobileContainer>
      </Container>
    </ThemeProvider>
  );
}