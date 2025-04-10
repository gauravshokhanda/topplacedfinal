// app/student/page.js
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function HomePage() {
  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f7fa">
      <Sidebar />

      {/* Main Content */}
      <Box flex={1} p={5} ml="280px">
        {/* Header Section */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" fontWeight={700} color="#1a1a1a">
            Welcome Back
          </Typography>
          <Paper
            component="form"
            sx={{
              p: "4px 8px",
              display: "flex",
              alignItems: "center",
              width: 450,
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Ask Topplaced AI or Search"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="submit" sx={{ p: "8px", color: "#1976d2" }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {/* Content Grid */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={3}
        >
          {/* Challenge Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "#ffffff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Typography variant="overline" fontWeight={600} color="#f28c38">
              DAILY CHALLENGE
            </Typography>
            <Typography variant="h5" fontWeight={600} mt={1} color="#1a1a1a">
              Find Three Experts
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
              Earn up to ₹1000 by completing this challenge
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                bgcolor: "#0A6E6E",
                "&:hover": { bgcolor: "#0A6E6E" },
              }}
            >
              Start Challenge
            </Button>
          </Paper>

          {/* Referral Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "#ffffff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <Typography variant="h5" fontWeight={600} color="#1a1a1a">
              Job Referrals
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
              Boost your job chances by 10x with referrals
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                borderColor: "#0A6E6E",
                color: "#0A6E6E",
                "&:hover": {
                  borderColor: "#1565c0",
                  bgcolor: "#0A6E6E",
                  color: "white",
                },
              }}
            >
              Get Referred
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
