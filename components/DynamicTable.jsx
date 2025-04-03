'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  TablePagination,
  styled,
  Chip,
  Typography,
} from '@mui/material';

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

const DynamicTable = ({
  columns, // Array of column definitions
  data, // Array of data to display
  loading, // Boolean to show loading state
  error, // Error message if any
  totalItems, // Total number of items for pagination
  rowsPerPageOptions = [5, 10, 25], // Options for rows per page
  onPageChange, // Callback for page change
  onRowsPerPageChange, // Callback for rows per page change
  page, // Current page
  rowsPerPage, // Rows per page
}) => {
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
    <TableContainer
      component={Paper}
      elevation={6}
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #106861',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={row._id || index}>
              {columns.map((column) => (
                <StyledTableCell key={column.id}>
                  {column.render ? column.render(row) : row[column.id]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
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
      {data.length === 0 && (
        <Typography
          align="center"
          sx={{ mt: 3, color: '#106861', fontStyle: 'italic', fontWeight: 'medium' }}
        >
          No data found
        </Typography>
      )}
    </TableContainer>
  );
};

export default DynamicTable;