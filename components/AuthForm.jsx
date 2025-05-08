"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { API } from "@/app/config/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/redux/slices/studentAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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

const DesktopContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  borderRadius: 16,
  overflow: "hidden",
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
  transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
  paddingTop: theme.spacing(7),
}));

const AuthBox = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  padding: theme.spacing(5),
  paddingTop: theme.spacing(7),
  borderRadius: 12,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "12px 24px",
  fontWeight: 500,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(10, 110, 110, 0.2)",
  },
}));

const AuthForm = ({ isLogin, toggleAuth, onClose }) => {
  console.log("onClose is:", onClose);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    if (!password) errs.password = "Password is required";
    if (!isLogin && !fullName) errs.fullName = "Full name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  const handleSubmit = async () => {
    if (!validate()) return;
    const role = isTeacher ? "Teacher" : "Student";
    setLoading(true);
    try {
      if (isLogin) {
        const response = await API.post("auth/login", { email, password });
        // console.log("response", response.data);
        dispatch(loginSuccess(response.data));
        toast.success("Logged in successfully");
        onClose?.();
        console.log("onClose is:", onClose);
        
        const userRole = response.data?.role;
        // console.log("userRole", userRole);
        if (userRole === "Teacher") {
          router.push("/Onboarding");
        } else {
          router.push("/dashboard/student/home");
        }
      } else {
        const response = await API.post("auth/register", {
          name: fullName,
          email,

          password,
          role,
        });
        
        console.log("registered data", response.data);
        dispatch(loginSuccess(response.data));
        toast.success("Registered successfully");
        onClose?.();
        const userRole = response.data?.role;
        if (userRole === "Teacher") {
          router.push("/Onboarding");
        } else {
          router.push("/dashboard/student/home");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const user = useSelector((state) => state.studentAuth.user);
  console.log("user", user);
  const newdata = useSelector((state) => state.studentAuth);
  console.log("newdata", newdata);
  useEffect(() => {
    if (user) {
      const userRole = user.role;
      console.log("userrole", userRole);
      if (userRole === "Teacher") {
        router.push("/Onboarding");
      } else {
        router.push("/dashboard/student/home");
      }
    }
  },[user])

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
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
      )}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      {!isLogin && (
        <FormControlLabel
          control={
            <Checkbox
              checked={isTeacher}
              onChange={(e) => setIsTeacher(e.target.checked)}
              color="primary"
            />
          }
          label="Sign up as Teacher"
        />
      )}
      <StyledButton
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : isLogin ? "Sign In" : "Sign Up"}
      </StyledButton>
      <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
        <Button color="primary" onClick={toggleAuth} sx={{ fontWeight: 500, textTransform: "none" }}>
          {isLogin ? "Sign Up" : "Sign In"}
        </Button>
      </Typography>
    </FormContainer>
  );
};

export default function AuthPage({onClose}) {
  const [isLogin, setIsLogin] = useState(true);
  const toggleAuth = () => setIsLogin((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} />
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
          <Typography variant="body1" sx={{ textAlign: "center", maxWidth: "80%" }}>
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
          <AuthBox>
            <AuthForm isLogin={isLogin} toggleAuth={toggleAuth}  onClose={onClose}/>
          </AuthBox>
        </FormBox>
      </DesktopContainer>
      <MobileContainer>
        <AuthBox>
          <AuthForm isLogin={isLogin} toggleAuth={toggleAuth}  onClose={onClose}/>
        </AuthBox>
      </MobileContainer>
    </ThemeProvider>
  );
}
