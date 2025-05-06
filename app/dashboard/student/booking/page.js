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
  TextField,
  MenuItem,
  Stack,
  CircularProgress,
} from '@mui/material';
import Swal from 'sweetalert2';
import DynamicTable from '../../../../components/DynamicTable'; 
import { API } from '../../../config/apiConfig';
import { useSelector } from 'react-redux';

export default function TeacherBooking() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    selectDate: '',
    selectTime: '',
    yourField: '',
    name: '',
    email: '',
    whatsappNumber: '',
  });
  const token = useSelector((state) => state.studentAuth.token);
  const student = useSelector((state) => state.studentAuth.user);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const response = await API.get('interviews/my', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInterviews(response.data.data);
      setTotalItems(response.data.totalItems);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await API.get('interviews/available/week');
      const available = response.data.slots.filter(
        (slot) => slot.isAvailable && slot.availableTimes.length > 0
      );
      setSlots(available);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (openModal) {
      fetchAvailableSlots();
      if (student) {
        setFormData((prev) => ({
          ...prev,
          name: student.name || '',
          email: student.email || '',
          whatsappNumber: student.whatsapp || '',
        }));
      }
    }
  }, [openModal]);

  useEffect(() => {
    if (!formData.selectDate) {
      setAvailableTimes([]);
      return;
    }
    const selectedSlot = slots.find((slot) => slot.isoDate === formData.selectDate);
    if (selectedSlot) {
      setAvailableTimes(selectedSlot.availableTimes);
    }
  }, [formData.selectDate, slots]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async () => {
    try {
      const response = await API.post('/interviews', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Interview scheduled successfully.',
        confirmButtonColor: '#106861',
      });

      setOpenModal(false);
      setFormData({
        selectDate: '',
        selectTime: '',
        yourField: '',
        name: '',
        email: '',
        whatsappNumber: '',
      });
      setPage(0);
      fetchInterviews();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Error scheduling interview',
        confirmButtonColor: '#106861',
      });
    }
  };

  const columns = [
    {
      id: 'selectDate',
      label: 'Date',
      render: (row) =>
        new Date(row.selectDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
    {
      id: 'selectTime',
      label: 'Time',
      render: (row) => (
        <Chip
          label={row.selectTime}
          sx={{
            backgroundColor: '#106861',
            color: 'white',
            '&:hover': { backgroundColor: '#0d544d' },
          }}
          size="small"
        />
      ),
    },
    {
      id: 'yourField',
      label: 'Field',
      render: (row) => (
        <Chip
          label={row.yourField}
          sx={{
            backgroundColor:
              row.yourField === 'Software Engineer' || row.yourField === 'Data Analyst'
                ? '#106861'
                : '#388e3c',
            color: 'white',
            '&:hover': { opacity: 0.9 },
          }}
          size="small"
        />
      ),
    },
    { id: 'name', label: 'Name' },
    {
      id: 'email',
      label: 'Email',
      render: (row) => (
        <Typography
          component="a"
          href={`mailto:${row.email}`}
          sx={{
            color: '#106861',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline', color: '#0d544d' },
          }}
        >
          {row.email}
        </Typography>
      ),
    },
    { id: 'whatsappNumber', label: 'WhatsApp' },
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
        Booking Management
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3, backgroundColor: '#106861' }}
        onClick={() => setOpenModal(true)}
      >
        Schedule Interview
      </Button>

      <DynamicTable
        columns={columns}
        data={interviews}
        loading={loading}
        error={error}
        totalItems={totalItems}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" value={formData.name} InputProps={{ readOnly: true }} required />
            <TextField label="Email" value={formData.email} InputProps={{ readOnly: true }} required />
            <TextField
              label="WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              required
            />
            <TextField
              label="Field"
              select
              value={formData.yourField}
              onChange={(e) => setFormData({ ...formData, yourField: e.target.value })}
              required
            >
              {['Software Engineer', 'Data Analyst', 'DevOps', 'Other'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date"
              select
              value={formData.selectDate}
              onChange={(e) => setFormData({ ...formData, selectDate: e.target.value })}
              required
            >
              {slots.map((slot) => (
                <MenuItem key={slot.isoDate} value={slot.isoDate}>
                  {slot.date}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Time"
              select
              value={formData.selectTime}
              onChange={(e) => setFormData({ ...formData, selectTime: e.target.value })}
              required
              disabled={!availableTimes.length}
            >
              {availableTimes.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#106861' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
