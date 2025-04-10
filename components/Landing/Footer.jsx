"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { label: "Features", id: "features-section" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Skills", id: "skills-section" },
  { label: "Mentors", id: "mentors-section" },
  { label: "Contact", id: "contact-section" },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (id) => {
    if (pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <Box sx={{ background: "#106861", color: "white", py: 4, mt: 5 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold">TopPlaced</Typography>
            <Typography variant="body2">
              Helping you ace your interviews with expert guidance.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold">Quick Links</Typography>
            {navItems.map((item) => (
              <Typography
                key={item.label}
                onClick={() => handleClick(item.id)}
                sx={{
                  cursor: "pointer",
                  color: "white",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold">Contact Us</Typography>
            <Typography variant="body2">Email: topplaced18@gmail.com</Typography>
            <Typography variant="body2">Phone: +91 701 768 2436</Typography>
            <Typography variant="body2">Address: Sector 62 Noida, Uttar Pradesh</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
