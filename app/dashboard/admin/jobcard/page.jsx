"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DynamicTable from '@/components/DynamicTable';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
  IconButton, Avatar, Typography
} from '@mui/material';
import { API } from '../../../config/apiConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function JobCardAdminPanel() {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dynamicFields, setDynamicFields] = useState([]);
  const token = useSelector((state) => state.studentAuth.token);

  const fetchJobCards = async () => {
    try {
      setLoading(true);
      const res = await API.get('job-cards', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobCards(res.data || []);
      setError(null);

      if (res.data?.length > 0) {
        const first = res.data[0];
        const fields = first.filledFields?.map(f => f.label) || [];
        setDynamicFields([...new Set(fields)]);
      }
    } catch (err) {
      setError('Failed to load job cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobCards();
  }, []);

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => setRowsPerPage(parseInt(e.target.value, 10));

  const handleEditSave = async () => {
    try {
      await API.put(`job-cards/${selectedCard._id}`, selectedCard, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenEdit(false);
      fetchJobCards(); // Refresh the table
    } catch (err) {
      alert('Update failed');
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job card?')) return;
    try {
      await API.delete(`job-cards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobCards();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const columns = [
    {
      id: 'photo',
      label: 'Photo',
      render: (row) => (
        <Avatar
          alt="Student Photo"
          src={row?.student?.profile?.studentDetails?.image || '/avatar.png'}
          sx={{ width: 40, height: 40 }}
        />
      )
    },
    {
      id: 'studentName',
      label: 'Student Name',
      render: (row) => row?.student?.name || 'N/A'
    },
    ...dynamicFields.map(label => ({
      id: label,
      label: label,
      render: (row) => row.filledFields?.find(f => f.label === label)?.value || "-"
    })),
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <>
          <IconButton
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCard({ ...row });
              setOpenEdit(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600}>Job Cards</Typography>
      </Box>

      <DynamicTable
        columns={columns}
        data={jobCards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        loading={loading}
        error={error}
        totalItems={jobCards.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* ✏️ Edit Job Card Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Job Card</DialogTitle>
        <DialogContent>
          {dynamicFields.map((label) => {
            const field = selectedCard?.filledFields?.find(f => f.label === label);
            return (
              <TextField
                key={label}
                fullWidth
                margin="dense"
                label={label}
                value={field?.value || ''}
                onChange={(e) => {
                  const updated = selectedCard.filledFields.map(f =>
                    f.label === label ? { ...f, value: e.target.value } : f
                  );
                  setSelectedCard({ ...selectedCard, filledFields: updated });
                }}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
