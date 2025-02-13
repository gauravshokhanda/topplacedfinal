"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  ListItemIcon,
  Avatar,
  Paper,
  InputBase,
  Grid,
  useMediaQuery,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 250;

const menuItems = [
  { text: "Home", path: "/dashboard/student/home", icon: <HomeIcon /> },
  { text: "Find People", path: "/dashboard/student/dashboard", icon: <DashboardIcon /> },
  { text: "Booking", path: "/dashboard/student/booking", icon: <LibraryBooksIcon /> },
  { text: "Mock Resumes", path: "/dashboard/student/mock-resumes", icon: <DescriptionIcon /> },
  { text: "Job Card", path: "/dashboard/student/job-card", icon: <WorkIcon /> },
  { text: "Profile", path: "/dashboard/student/profile", icon: <AssignmentIndIcon /> },
];

export default function StudentLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery("(max-width:900px)"); // Detect mobile view

  const currentPage = menuItems.find((item) => item.path === pathname)?.text || "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      
      {/* Sidebar - Hidden on Mobile */}
  
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : 70,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : 70,
              boxSizing: "border-box",
              transition: "width 0.3s ease-in-out",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: open ? "space-between" : "center", alignItems: "center", backgroundColor: "#4a238d" }}>
            {open && <Typography variant="h6" color="white">Top Placed</Typography>}
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
          <Divider />

          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link}
                href={item.path}
                selected={pathname === item.path}
                sx={{
                  backgroundColor: pathname === item.path ? "#4a238d" : "transparent",
                  color: pathname === item.path ? "white" : "inherit",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#4a238d",
                    color: "white",
                  },
                }}
              >
                <ListItemIcon sx={{ color: pathname === item.path ? "white" : "inherit" }}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>

          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ width: 50, height: 50, mb: 1 }}>T</Avatar>
            {open && <Typography variant="body1">Teacher</Typography>}
            <ListItem button onClick={handleLogout} sx={{ mt: 1, borderRadius: "10px", width: "90%" }}>
              <ListItemIcon sx={{ color: "red" }}>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" sx={{ color: "red" }} />}
            </ListItem>
          </Box>
        </Drawer>
 

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: 8,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${open && !isMobile ? drawerWidth : 0}px)`,
            marginLeft: open && !isMobile ? `${drawerWidth}px` : "0px",
            transition: "width 0.3s ease-in-out, margin 0.3s ease-in-out",
            backgroundColor: "#4a238d",
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton onClick={() => setOpen(!open)} sx={{ color: "white", mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}

            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {currentPage}
            </Typography>

            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                width: 300,
                backgroundColor: "white",
              }}
            >
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
              />
              <SearchIcon sx={{ color: "#4a238d" }} />
            </Paper>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
