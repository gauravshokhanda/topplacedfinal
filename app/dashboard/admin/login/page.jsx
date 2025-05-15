"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "@/redux/slices/adminAuthSlice";
import { API } from "../../../config/apiConfig";

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.adminAuth);

  const [isMounted, setIsMounted] = useState(false); // ⛔ Hydration fix

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🧠 Hydration guard
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🔐 Redirect if already logged in
  useEffect(() => {
    if (isMounted && auth.token && auth.user?.role?.toLowerCase() === "admin") {
      router.push("/dashboard/admin");
    }
  }, [auth, isMounted, router]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "auth/login" : "auth/register";
    const payload = isLogin
      ? { email, password, role: "Admin" }
      : { name, email, password, role: "Admin" };

    try {
      const res = await API.post(endpoint, payload);
      const { token, ...user } = res.data;
      user.role = user.role.toLowerCase();

      if (user.role !== "admin") {
        alert("Only admin access is allowed.");
        return;
      }

      dispatch(setLogin({ token, user }));
      router.push("/dashboard/admin");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          `${isLogin ? "Login" : "Signup"} failed.`
      );
    } finally {
      setLoading(false);
    }
  };

  // ❌ Prevent hydration error
  if (!isMounted) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        <Avatar sx={{ bgcolor: "#106861", mx: "auto", mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" color="#106861" gutterBottom>
          {isLogin ? "Admin Login" : "Admin Signup"}
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          {!isLogin && (
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <TextField
            label="Email"
            name="admin_email_xyz"
            autoComplete="new-email"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            name="admin_pass_xyz"
            autoComplete="new-password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: "#106861",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Signup"}
          </Button>
        </form>

        {/* <Box mt={3}>
          <Typography variant="body2" sx={{ fontSize: "14px" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              component="button"
              onClick={toggleForm}
              sx={{ color: "#106861", fontWeight: "bold" }}
            >
              {isLogin ? "Sign up here" : "Login here"}
            </Link>
          </Typography>
        </Box> */}
      </Paper>
    </Container>
  );
}
