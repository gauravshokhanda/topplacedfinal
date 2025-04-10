'use client';

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DynamicTable from '../../../../components/DynamicTable'; // Adjust the import path as needed
import { API } from '../../../config/apiConfig';

export default function AvailableSlotsManagement() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({ date: '', timeSlots: [''] });

  // Fetch all available slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const response = await API.get('/available-slots/');
        setSlots(response.data);
        setTotalItems(response.data.length); // Assuming no server-side pagination
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open dialog for adding or editing
  const handleOpenDialog = (slot = null) => {
    setSelectedSlot(slot);
    setFormData({
      date: slot ? slot.date.split('T')[0] : '',
      timeSlots: slot ? slot.timeSlots : [''],
    });
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSlot(null);
    setFormData({ date: '', timeSlots: [''] });
    setError(null); // Clear error on close
  };

  // Handle date input change
  const handleDateChange = (e) => {
    setFormData({ ...formData, date: e.target.value });
  };

  // Handle time slot change
  const handleTimeChange = (index, value) => {
    const newTimeSlots = [...formData.timeSlots];
    newTimeSlots[index] = value;
    setFormData({ ...formData, timeSlots: newTimeSlots });
  };

  // Add a new time slot input
  const addTimeSlot = () => {
    setFormData({ ...formData, timeSlots: [...formData.timeSlots, ''] });
  };

  // Remove a time slot input
  const removeTimeSlot = (index) => {
    const newTimeSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData({ ...formData, timeSlots: newTimeSlots });
  };

  const handleSubmit = async () => {
    try {
      const filteredTimeSlots = formData.timeSlots.filter((slot) => slot !== '');
      if (!formData.date || filteredTimeSlots.length === 0) {
        setError('Date and at least one time slot are required');
        return;
      }

      const payload = { date: formData.date, timeSlots: filteredTimeSlots };

      if (selectedSlot) {
        const response = await API.put(`/available-slots/${formData.date}`, payload);
        console.log('Update Response:', response.data);

        setSlots((prevSlots) => {
          const updatedSlots = prevSlots.map((slot) => {
            const slotDate = slot.date.split('T')[0];
            if (slotDate === formData.date) {
              return { ...slot, timeSlots: filteredTimeSlots };
            }
            return slot;
          });
          console.log('Updated Slots:', updatedSlots);
          return [...updatedSlots];
        });
      } else {
        const response = await API.post('/available-slots/', payload);
        console.log('Add Response:', response.data);
        setSlots((prevSlots) => {
          const newSlots = [...prevSlots, response.data.availableSlot];
          console.log('New Slots:', newSlots);
          return newSlots;
        });
        setTotalItems((prevTotal) => prevTotal + 1);
      }

      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Error in handleSubmit:', err);
    }
  };

  // Delete slot
  const handleDelete = async (date) => {
    try {
      const normalizedDate = date.split('T')[0];
      console.log('Deleting date:', normalizedDate);

      await API.delete(`/available-slots/${normalizedDate}`);
      setSlots((prevSlots) => {
        const updatedSlots = prevSlots.filter((slot) => slot.date.split('T')[0] !== normalizedDate);
        console.log('Slots after delete:', updatedSlots);
        return updatedSlots;
      });
      setTotalItems((prevTotal) => prevTotal - 1);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Delete Error:', err);
    }
  };

  // Define columns for DynamicTable
  const columns = [
    {
      id: 'date',
      label: 'Date',
      render: (row) => new Date(row.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    },
    {
      id: 'timeSlots',
      label: 'Time Slots',
      render: (row) => (
        <Box>
          {row.timeSlots.map((slot, index) => (
            <Chip
              key={index}
              label={slot}
              sx={{ backgroundColor: '#106861', color: 'white', m: 0.5 }}
              size="small"
            />
          ))}
        </Box>
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleOpenDialog(row)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row.date)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 4,
          color: '#106861',
          fontWeight: 'bold',
          textAlign: 'center',
          borderBottom: '2px solid #106861',
          pb: 1,
        }}
      >
        Available Slots Management
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2, backgroundColor: '#106861', '&:hover': { backgroundColor: '#0d544d' } }}
        onClick={() => handleOpenDialog()}
      >
        Add New Slot
      </Button>

      <DynamicTable
        columns={columns}
        data={slots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} // Client-side pagination
        loading={loading}
        error={error}
        totalItems={totalItems}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedSlot ? 'Edit Slot' : 'Add New Slot'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Date</Typography>
            <input
              type="date"
              value={formData.date}
              onChange={handleDateChange}
              disabled={!!selectedSlot} // Disable date editing for updates
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Time Slots</Typography>
            {formData.timeSlots.map((slot, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <input
                  type="time"
                  value={slot}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  style={{
                    width: '150px',
                    padding: '8px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
                {formData.timeSlots.length > 1 && (
                  <IconButton onClick={() => removeTimeSlot(index)} sx={{ ml: 1 }}>
                    <RemoveIcon />
                  </IconButton>
                )}
                {index === formData.timeSlots.length - 1 && (
                  <IconButton onClick={addTimeSlot} sx={{ ml: 1 }}>
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {selectedSlot ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}