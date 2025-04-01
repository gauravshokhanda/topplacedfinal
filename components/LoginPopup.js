// components/LoginPopup.js
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

export default function LoginPopup({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    console.log("Login attempted with:", { email, password });
    onClose();
  };

  const handleGoogleLogin = () => {
    console.log("Google login attempted");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          background: "#ffffff",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.6)",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          backgroundColor: "#0A6E6E",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h6" 
          component="span"
          sx={{
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          Student Login
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 4,
          background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 2,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Name Field */}
          <TextField
            fullWidth
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                "&:hover fieldset": {
                  borderColor: "#0A6E6E",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0A6E6E",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#0A6E6E",
                },
              },
            }}
          />
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                "&:hover fieldset": {
                  borderColor: "#0A6E6E",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0A6E6E",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#0A6E6E",
                },
              },
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                "&:hover fieldset": {
                  borderColor: "#0A6E6E",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0A6E6E",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#0A6E6E",
                },
              },
            }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#0A6E6E",
              color: "#fff",
              borderRadius: "12px",
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "600",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(10,110,110,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#085858",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(10,110,110,0.4)",
              },
            }}
          >
            Sign In
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 1, color: "#999" }}>OR</Divider>

          {/* Google Login Button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={{
              borderRadius: "12px",
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "600",
              textTransform: "none",
              color: "#333",
              borderColor: "#ccc",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#0A6E6E",
                color: "#0A6E6E",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            Login with Google
          </Button>

          {/* Forgot Password */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#0A6E6E",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}