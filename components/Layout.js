"use client";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
}