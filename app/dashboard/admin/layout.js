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
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const menuItems = [
  // { text: "Home", path: "/dashboard/admin/home", icon: <HomeIcon /> },
  // { text: "Dashboard", path: "/dashboard/teacher/dashboard", icon: <DashboardIcon /> },
  { text: "Booking", path: "/dashboard/admin/booking", icon: <LibraryBooksIcon /> },
  { text: "Available Slots", path: "/dashboard/admin/AvailableSlotsManagement", icon: <DescriptionIcon /> },
  // { text: "Job Card", path: "/dashboard/teacher/job-card", icon: <WorkIcon /> },
];

export default function TeacherLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("role"); // Remove user session
    router.push("/login"); // Redirect to login page
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? drawerWidth : 70}px)`,
          marginLeft: open ? `${drawerWidth}px` : "70px",
          transition: "width 0.3s ease-in-out, margin 0.3s ease-in-out",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
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
        {/* Sidebar Header */}
        <Toolbar sx={{ display: "flex", justifyContent: open ? "space-between" : "center", alignItems: "center", p: 2 }}>
          {open && <Typography variant="h6">Admin Panel</Typography>}
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Divider />

        {/* Sidebar Menu */}
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              sx={{
                backgroundColor: pathname === item.path ? "#106861" : "transparent",
                color: pathname === item.path ? "white" : "inherit",
                borderRadius: "10px",
                margin: "5px",
                "&:hover": {
                  backgroundColor: "#106861",
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

        {/* Avatar & Logout Button (Bottom) */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ width: 50, height: 50, mb: 1 }}>T</Avatar>
          {open && <Typography variant="body1">Admin</Typography>}
          <ListItem component="button" onClick={handleLogout} sx={{ mt: 1, borderRadius: "10px", width: "90%" }}>
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
          // ml: `${open ? drawerWidth : 70}px`,
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
