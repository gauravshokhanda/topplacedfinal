// pages/index.js
"use client";
import { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Divider } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import GoogleIcon from '@mui/icons-material/Google';

// Theme configuration
const theme = createTheme({
  palette: { primary: { main: '#0A6E6E' } },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
});

// Styled components
const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  padding: theme.spacing(4),
}));

const WelcomeBox = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isLogin",
})(({ isLogin }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
  padding: "40px",
  backgroundColor: "#0A6E6E",
  color: "#ffffff",
  transform: isLogin ? "translateX(0)" : "translateX(100%)",
  boxShadow: "0 8px 32px rgba(10, 110, 110, 0.1)",
  borderRadius: "16px",
}));

const FormBox = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isLogin",
})(({ isLogin }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
  transform: isLogin ? "translateX(0)" : "translateX(-100%)",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 8px 32px rgba(10, 110, 110, 0.1)",
  borderRadius: "16px",
}));

const FormContainer = styled(Box)({
  width: "340px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "40px",
});

const StyledButton = styled(Button)({
  padding: "12px",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 500,
});

// Reusable Form Component
const AuthForm = ({ isLogin, toggleAuth, handleGoogleLogin }) => (
  <FormContainer>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#0A6E6E' }}>
      {isLogin ? "Sign In" : "Sign Up"}
    </Typography>
    {!isLogin && (
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        size="medium"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      />
    )}
    <TextField
      label="Email"
      variant="outlined"
      fullWidth
      size="medium"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      fullWidth
      size="medium"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
    />
    <StyledButton variant="contained" color="primary" fullWidth>
      {isLogin ? "Sign In" : "Sign Up"}
    </StyledButton>
    <Divider>or</Divider>
    <StyledButton
      variant="outlined"
      color="primary"
      fullWidth
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
    >
      {isLogin ? "Sign in with Google" : "Sign up with Google"}
    </StyledButton>
    <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey.600' }}>
      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
      <Button
        color="primary"
        onClick={toggleAuth}
        sx={{ textTransform: "none", padding: 0, fontWeight: 500 }}
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
        <WelcomeBox elevation={0} isLogin={isLogin}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'inherit', mb: 2 }}>
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </Typography>
          <Typography variant="body1" sx={{ color: 'inherit', textAlign: 'center', maxWidth: '80%' }}>
            {isLogin ? "Sign in to continue your journey with us" : "Create an account to start exploring"}
          </Typography>
        </WelcomeBox>

        <FormBox elevation={0} isLogin={isLogin}>
          <AuthForm
            isLogin={isLogin}
            toggleAuth={toggleAuth}
            handleGoogleLogin={handleGoogleLogin}
          />
        </FormBox>
      </Container>
    </ThemeProvider>
  );
}