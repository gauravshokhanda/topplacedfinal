"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { API } from "@/app/config/apiConfig";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slices/studentAuthSlice";

// Enhanced Theme configuration
const theme = createTheme({
  palette: {
    primary: { main: "#0A6E6E" },
    secondary: { main: "#F5F7FA" },
    background: { default: "#FFFFFF" },
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
          textTransform: "none",
          fontSize: "1rem",
          padding: "10px 20px",
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
  [theme.breakpoints.down("md")]: {
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
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MobileContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
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
  // backgroundColor: "#FFFFFF",
  transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
  paddingTop: theme.spacing(7),
}));

const AuthBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  padding: theme.spacing(5),
  paddingTop: theme.spacing(7), 
  // backgroundColor: "#FFFFFF",
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
  "&:hover": {
    boxShadow: "0 4px 12px rgba(10, 110, 110, 0.2)",
  },
}));

const AuthForm = ({ isLogin, toggleAuth, handleGoogleLogin }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        const response = await API.post("auth/login", {
          email,
          password,
        });
        console.log("Login Success:", response.data);
        dispatch(loginSuccess(response.data));
      } catch (error) {
        console.error("Login Failed:", error.response?.data || error.message);
      }
    } else {
      try {
        const response = await API.post("auth/register", {
          name: fullName,
          email,
          password,
        });
        console.log("Register Success:", response.data);
      } catch (error) {
        console.error("Register Failed:", error.response?.data || error.message);
      }
    }
  };
  
  return (

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
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
    )}
    <TextField
      label="Email"
      variant="outlined"
      fullWidth
      autoComplete="email"
      value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      fullWidth
      autoComplete={isLogin ? "current-password" : "new-password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <StyledButton variant="contained" color="primary" fullWidth  onClick={handleSubmit}>
      {isLogin ? "Sign In" : "Sign Up"}
    </StyledButton>

    <Typography
      variant="body2"
      sx={{ textAlign: "center", color: "text.secondary" }}
    >
      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
      <Button
        color="primary"
        onClick={toggleAuth}
        sx={{ fontWeight: 500, textTransform: "none" }}
      >
        {isLogin ? "Sign Up" : "Sign In"}
      </Button>
    </Typography>
  </FormContainer>
  );
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuth = () => setIsLogin((prev) => !prev);
  const handleGoogleLogin = () => console.log("Google login clicked");

  return (
    <ThemeProvider theme={theme}>
      {/* Desktop Version with Sliding Animation */}
      <DesktopContainer>
        <WelcomeBox
          sx={{
            flex: 1.2,
            transform: isLogin ? "translateX(0)" : "translateX(105%)",
          }}
        >
          <Typography variant="h3" gutterBottom>
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", maxWidth: "80%" }}
          >
            {isLogin
              ? "Sign in to continue your journey with us"
              : "Create an account to start exploring"}
          </Typography>
        </WelcomeBox>
        <FormBox
          sx={{
            flex: 1.8,
            transform: isLogin ? "translateX(0)" : "translateX(-100%)",
          }}
        >
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
    </ThemeProvider>
  );
}
