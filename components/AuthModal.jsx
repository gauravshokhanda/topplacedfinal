"use client";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AuthForm from "./AuthForm"; 

export default function AuthModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent sx={{ position: "relative", p: 3 }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <AuthForm isLogin={true} toggleAuth={() => {}} onClose={onClose} />

      </DialogContent>
    </Dialog>
  );
}
