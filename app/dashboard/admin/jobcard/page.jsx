"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DynamicTable from '@/components/DynamicTable';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';
import { API } from '../../../config/apiConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function JobCardAdminPanel() {
  const [jobCards, setJobCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [newCard, setNewCard] = useState({
    student: '',
    mentor: '',
    rating: '',
    feedback: '',
    academicPerformance: '',
    attendance: '',
    communication: '',
    teamwork: '',
    technicalSkills: '',
    progress: '',
    totalProjects: ''
  });

  const token = useSelector((state) => state.studentAuth.token);

  const fetchJobCards = async () => {
    try {
      setLoading(true);
      const res = await API.get('job-cards', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobCards(res.data);
      setError(null);
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
  const handleRowClick = (row) => {
    setSelectedCard(row);
    setOpenEdit(true);
  };

  const handleEditSave = async () => {
    try {
      await API.put(`job-cards/${selectedCard._id}`, selectedCard, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenEdit(false);
      fetchJobCards();
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job card?')) return;
    try {
      await API.delete(`jobcards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobCards();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleAddJobCard = async () => {
    try {
      await API.post('job-cards', newCard, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOpenAdd(false);
      setNewCard({
        student: '',
        mentor: '',
        rating: '',
        feedback: '',
        academicPerformance: '',
        attendance: '',
        communication: '',
        teamwork: '',
        technicalSkills: '',
        progress: '',
        totalProjects: ''
      });
      fetchJobCards();
    } catch (err) {
      alert('Create failed');
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
    { id: 'mentor', label: 'Mentor' },
    { id: 'rating', label: 'Rating' },
    { id: 'progress', label: 'Progress (%)' },
    { id: 'academicPerformance', label: 'Academic (%)' },
    { id: 'attendance', label: 'Attendance (%)' },
    { id: 'communication', label: 'Communication (%)' },
    { id: 'teamwork', label: 'Teamwork (%)' },
    { id: 'technicalSkills', label: 'Technical Skills (%)' },
    { id: 'totalProjects', label: 'Total Projects' },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <IconButton color="error" onClick={(e) => { e.stopPropagation(); handleDelete(row._id); }}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAdd(true)}>
          Add Job Card
        </Button>
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
        onRowClick={handleRowClick}
      />

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Job Card</DialogTitle>
        <DialogContent>
          {selectedCard && Object.keys(newCard).map((key) => (
            <TextField
              key={key}
              margin="dense"
              fullWidth
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={selectedCard[key] || ''}
              onChange={(e) => setSelectedCard({ ...selectedCard, [key]: e.target.value })}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Job Card</DialogTitle>
        <DialogContent>
          {Object.keys(newCard).map((key) => (
            <TextField
              key={key}
              margin="dense"
              fullWidth
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={newCard[key]}
              onChange={(e) => setNewCard({ ...newCard, [key]: e.target.value })}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddJobCard}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
