'use client';

import { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
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
  const token = useSelector((state) => state.studentAuth.token);


  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const response = await API.get('interviews/', {
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

    fetchInterviews();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Define the columns for the DynamicTable
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
    </Box>
  );
}