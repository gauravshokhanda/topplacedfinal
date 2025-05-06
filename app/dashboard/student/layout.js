"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Avatar,
  Paper,
  InputBase,
  Tooltip,
} from "@mui/material";
import { logout } from "@/redux/slices/studentAuthSlice";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import ProtectedRoute from "@/components/ProtectedRoute";
import { persistor } from "@/redux/store";

import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
const HomeIcon = dynamic(() => import("@mui/icons-material/Home"), { ssr: false });
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
const WorkIcon = dynamic(() => import("@mui/icons-material/Work"), { ssr: false });
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 250;

const menuItems = [
  { text: "Home", path: "/dashboard/student/home", icon: <HomeIcon /> },
  { text: "Booking", path: "/dashboard/student/booking", icon: <LibraryBooksIcon /> },
  { text: "Job Card", path: "/dashboard/student/job-card", icon: <WorkIcon /> },
  { text: "Profile", path: "/dashboard/student/profile", icon: <AssignmentIndIcon /> },
];

export default function StudentLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const currentPage = menuItems.find((item) => item.path === pathname)?.text || "Dashboard";

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A6E6E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        localStorage.clear();
        persistor.purge();
        router.push("/login");

        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <ProtectedRoute allowedRoles={["Student"]}>
      <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
        {/* LEFT SIDEBAR */}
        <Box
          sx={{
            width: open ? drawerWidth : 70,
            flexShrink: 0,
            overflowY: "auto",
            borderRight: "1px solid #ddd",
            transition: "width 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* SIDEBAR HEADER */}
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: open ? "space-between" : "center",
              alignItems: "center",
              backgroundColor: "#0A6E6E",
            }}
          >
            {open && <Typography variant="h6" color="white">Top Placed</Typography>}
            <IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>

          <Divider />

          {/* MENU ITEMS */}
          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item) => (
              <Tooltip title={!open ? item.text : ""} placement="right" key={item.text}>
                <ListItem
                  component={Link}
                  href={item.path}
                  selected={pathname === item.path}
                  sx={{
                    backgroundColor: pathname === item.path ? "#0A6E6E" : "transparent",
                    color: pathname === item.path ? "white" : "inherit",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#0A6E6E",
                      color: "white",
                    },
                    cursor: "pointer",
                  }}
                >
                  <ListItemIcon sx={{ color: pathname === item.path ? "white" : "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItem>
              </Tooltip>
            ))}
          </List>

          {/* USER INFO & LOGOUT */}
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ width: 50, height: 50, mb: 1 }}>S</Avatar>
            {open && <Typography variant="body1">Student</Typography>}
            <ListItem
              component="button"
              onClick={handleLogout}
              sx={{ mt: 1, borderRadius: "10px", width: "90%", height: "25%" }}
            >
              <ListItemIcon sx={{ color: "red" }}>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" sx={{ color: "red" }} />}
            </ListItem>
          </Box>
        </Box>

        {/* RIGHT MAIN CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* APP BAR */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "#0A6E6E",
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <Typography variant="h6">{currentPage}</Typography>
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
          </Box>

          {/* CHILDREN */}
          <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", p: 2 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
