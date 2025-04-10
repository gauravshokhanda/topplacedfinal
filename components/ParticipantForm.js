'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

const ParticipantForm = ({ open, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    payment: 19.49,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        whatsapp: initialData.whatsapp || '',
        payment: initialData.payment || 19.49,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData._id ? 'Update Participant' : 'Register Participant'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="WhatsApp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Payment"
            name="payment"
            type="number"
            value={formData.payment}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {initialData._id ? 'Update' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticipantForm;