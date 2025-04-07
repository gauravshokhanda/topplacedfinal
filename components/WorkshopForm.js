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

const WorkshopForm = ({ open, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    workshopName: '',
    dateTime: '',
    meetingLink: '',
    price: 19.49,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        workshopName: initialData.workshopName || '',
        dateTime: initialData.dateTime ? new Date(initialData.dateTime).toISOString().slice(0, 16) : '',
        meetingLink: initialData.meetingLink || '',
        price: initialData.price || 19.49,
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
      <DialogTitle>{initialData._id ? 'Update Workshop' : 'Create Workshop'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Workshop Name"
            name="workshopName"
            value={formData.workshopName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Date and Time"
            name="dateTime"
            type="datetime-local"
            value={formData.dateTime}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Meeting Link"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
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
          {initialData._id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkshopForm;