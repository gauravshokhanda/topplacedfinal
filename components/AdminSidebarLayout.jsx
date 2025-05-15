"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  LinearProgress,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkIcon from "@mui/icons-material/Work";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/slices/adminAuthSlice";

const drawerWidth = 240;

const menuItems = [
  { text: "Students", path: "/dashboard/admin/Student", icon: <HomeIcon /> },
  { text: "Role", path: "/dashboard/admin/JobRole", icon: <WorkIcon /> },
  { text: "Job Card", path: "/dashboard/admin/jobcard", icon: <DashboardIcon /> },
  { text: "job-role-templates", path: "/dashboard/admin/job-role-templates", icon: <LibraryBooksIcon /> },
  { text: "Booking", path: "/dashboard/admin/booking", icon: <LibraryBooksIcon /> },
  { text: "Available Slots", path: "/dashboard/admin/AvailableSlotsManagement", icon: <AccessTimeIcon /> },
  { text: "Workshop", path: "/dashboard/admin/Workshop", icon: <WorkIcon /> },
  // { text: "JobCardsPage", path: "/dashboard/admin/JobCardsPage", icon: <AccessTimeIcon /> },
];

export default function TeacherLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [open, setOpen] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // Show loading bar when route changes
  useEffect(() => {
    setPageLoading(false); // new page has mounted
  }, [pathname]);

  const handleNavigation = (path) => {
    if (path !== pathname) {
      setPageLoading(true);
      router.push(path);
    }
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    dispatch(setLogout());
    router.replace("/dashboard/admin/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {pageLoading && (
        <LinearProgress
          color="primary"
          sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
        />
      )}

      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? drawerWidth : 70}px)`,
          marginLeft: open ? `${drawerWidth}px` : "70px",
          transition: "width 0.3s ease-in-out, margin 0.3s ease-in-out",
          backgroundColor: "#106861",
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

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 50,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 60,
            boxSizing: "border-box",
            transition: "width 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: open ? "space-between" : "center",
            alignItems: "center",
            p: 2,
          }}
        >
          {open && <Typography variant="h6">Admin Panel</Typography>}
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        <Divider />

        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => handleNavigation(item.path)}
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
              <ListItemIcon
                sx={{ color: pathname === item.path ? "white" : "inherit" }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar sx={{ width: 50, height: 50, mb: 1 }}>A</Avatar>
          {open && <Typography variant="body1">Admin</Typography>}

          <ListItem
            component="button"
            onClick={handleLogout}
            disabled={logoutLoading}
            sx={{
              mt: 1,
              borderRadius: "10px",
              width: "90%",
              color: logoutLoading ? "gray" : "red",
              justifyContent: open ? "initial" : "center",
            }}
          >
            <ListItemIcon sx={{ color: logoutLoading ? "gray" : "red" }}>
              {logoutLoading ? (
                <LinearProgress color="inherit" sx={{ width: "100%" }} />
              ) : (
                <LogoutIcon />
              )}
            </ListItemIcon>
            {open && (
              <ListItemText
                primary={logoutLoading ? "Logging out..." : "Logout"}
              />
            )}
          </ListItem>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          height: "100vh",             // Ensures full viewport height
          overflowY: "auto",           // Enables vertical scroll
          overflowX: "hidden",         // Keeps horizontal layout clean
          transition: "margin 0.3s ease-in-out",
        }}
      >

        {children}
      </Box>
    </Box>
  );
}
