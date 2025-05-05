"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { use, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import AuthModal from "@/components/AuthModal";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";


const navItems = [
  { label: "How It Works", id: "how-it-works" },
  { label: "Skills", id: "skills-section" },
  { label: "Workshops", path: "/upcoming-workshops" },
];


export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authInitiatedFromHeader, setAuthInitiatedFromHeader] = useState(false);
  const [redirecting, setRedirecting] = useState(false);


  const user = useSelector((state) => state.studentAuth.user);

  useEffect(() => {
    if (user && authInitiatedFromHeader) {
      const userRole = user.role || "Student";
      if (userRole === "Teacher") {
        router.push("/teacher");
      } else {
        router.push("/dashboard/student/home");
      }
      // reset the flag to prevent future unintended redirects
      setAuthInitiatedFromHeader(false);
    }
  }, [user, authInitiatedFromHeader]);


  const handleGetStarted = () => {
    if (user) {
      setRedirecting(true); // show loading spinner immediately
      const userRole = user.role || "Student";
      if (userRole === "Teacher") {
        router.push("/teacher");
      } else {
        router.push("/dashboard/student/home");
      }
    } else {
      setAuthInitiatedFromHeader(true);
      setOpenAuthModal(true);
    }
  };
  





  const scrollToSection = (id) => {
    const isOnLandingPage = pathname === "/";
    if (!id) return;

    if (isOnLandingPage) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setDrawerOpen(open);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => {
              setDrawerOpen(false);
              item.path ? router.push(item.path) : scrollToSection(item.id);
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button onClick={() => {
          setDrawerOpen(false);
          handleGetStarted();
        }}>
          <ListItemText primary="Get Started" />
        </ListItem>

      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ background: "#0A6E6E" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => scrollToSection("hero-section")}
          >
            TopPlaced
          </Typography>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) =>
              item.path ? (
                <Link key={item.label} href={item.path} passHref>
                  <Button color="inherit" sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                    {item.label}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={item.label}
                  color="inherit"
                  sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Button>
              )
            )}
            <Button
              variant="contained"
              sx={{ background: "white", color: "#106861", fontWeight: "bold" }}
              onClick={handleGetStarted}
              disabled={redirecting}
            >
              {redirecting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: "#106861" }} />
                  Redirecting...
                </Box>
              ) : (
                "Get Started"
              )}
            </Button>

          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>

      {/* Auth Modal */}
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  );
}
