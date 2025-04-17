'use client';

import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// Static booking data
const bookings = [
  {
    interviewName: 'System Design Mock Interview',
    mentorName: 'Alice Johnson',
    dateTime: '2025-05-01 10:00 AM',
    duration: '1 hour',
    amountPaid: '$50',
  },
  {
    interviewName: 'Coding Interview Prep',
    mentorName: 'Michael Smith',
    dateTime: '2025-05-03 2:00 PM',
    duration: '45 minutes',
    amountPaid: '$40',
  },
  {
    interviewName: 'Behavioral Interview Practice',
    mentorName: 'Sarah Brown',
    dateTime: '2025-05-05 11:00 AM',
    duration: '1 hour',
    amountPaid: '$55',
  },
];

export default function BookingHistory() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: '#f0f4f4',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Card
        sx={{
          maxWidth: '100%',
          mx: 'auto',
          p: 4,
          boxShadow: 6,
          borderRadius: 4,
          backgroundColor: '#fff',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#0A6E6E"
          gutterBottom
        >
          Booking History
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          View your past mock interviews and payment records.
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}
        >
          <Table aria-label="booking history table">
            <TableHead sx={{ backgroundColor: '#0A6E6E' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                  Interview Name
                </TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                  Mentor
                </TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                  Date & Time
                </TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                  Duration
                </TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                  Amount Paid
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                    transition: '0.2s',
                    '&:hover': {
                      backgroundColor: '#e1f4f4',
                    },
                  }}
                >
                  <TableCell>{booking.interviewName}</TableCell>
                  <TableCell>{booking.mentorName}</TableCell>
                  <TableCell>{booking.dateTime}</TableCell>
                  <TableCell>{booking.duration}</TableCell>
                  <TableCell>{booking.amountPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
