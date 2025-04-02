'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  TablePagination,
  styled,
  Chip,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: '#106861',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    color: '#333',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[50],
  },
  '&:hover': {
    backgroundColor: '#e0f2e9',
    transition: 'background-color 0.3s ease',
  },
}));

export default function TeacherBooking() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5100/api/interviews/', {
          params: {
            page: page + 1,
            limit: rowsPerPage,
          },
        });
        setInterviews(response.data.data);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
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

  const handleEditClick = (interview) => {
    setSelectedInterview(interview);
    setNewTime(interview.selectTime);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedInterview(null);
    setNewTime('');
  };

  const handleTimeUpdate = async () => {
    if (!selectedInterview || !newTime) return;

    try {
      const response = await axios.put(`http://localhost:5100/api/interviews/${selectedInterview._id}`, {
        selectTime: newTime,
      });
      
      // Update the local state with the new time
      setInterviews((prevInterviews) =>
        prevInterviews.map((interview) =>
          interview._id === selectedInterview._id
            ? { ...interview, selectTime: newTime }
            : interview
        )
      );
      handleDialogClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update time');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: '#106861' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

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

      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #106861',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="enhanced interviews table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Field</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>WhatsApp</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.map((interview) => (
              <StyledTableRow key={interview._id}>
                <StyledTableCell>
                  {new Date(interview.selectDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    label={interview.selectTime}
                    sx={{
                      backgroundColor: '#106861',
                      color: 'white',
                      '&:hover': { backgroundColor: '#0d544d' },
                    }}
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    label={interview.yourField}
                    sx={{
                      backgroundColor:
                        interview.yourField === 'Software Engineer' || interview.yourField === 'Data Analyst'
                          ? '#106861'
                          : '#388e3c',
                      color: 'white',
                      '&:hover': { opacity: 0.9 },
                    }}
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell>{interview.name}</StyledTableCell>
                <StyledTableCell>
                  <Typography
                    component="a"
                    href={`mailto:${interview.email}`}
                    sx={{
                      color: '#106861',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline', color: '#0d544d' },
                    }}
                  >
                    {interview.email}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>{interview.whatsappNumber}</StyledTableCell>
                <StyledTableCell>
                  {new Date(interview.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => handleEditClick(interview)} sx={{ color: '#106861' }}>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              fontSize: '0.9rem',
              color: '#106861',
            },
            '.MuiTablePagination-actions': {
              marginRight: '16px',
              '& .MuiIconButton-root': {
                color: '#106861',
                '&:hover': { backgroundColor: '#e0f2e9' },
              },
            },
          }}
        />
      </TableContainer>

      {interviews.length === 0 && (
        <Typography
          align="center"
          sx={{ mt: 3, color: '#106861', fontStyle: 'italic', fontWeight: 'medium' }}
        >
          No interviews found
        </Typography>
      )}

      {/* Edit Time Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ color: '#106861' }}>Update Interview Time</DialogTitle>
        <DialogContent>
          <TextField
            label="New Time (HH:mm)"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ '& .MuiInputLabel-root': { color: '#106861' }, '& .MuiOutlinedInput-root': { '&:hover fieldset': { borderColor: '#106861' } } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} sx={{ color: '#106861' }}>
            Cancel
          </Button>
          <Button onClick={handleTimeUpdate} sx={{ backgroundColor: '#106861', color: 'white', '&:hover': { backgroundColor: '#0d544d' } }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}