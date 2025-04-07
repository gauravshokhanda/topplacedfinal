'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, IconButton, Box, Typography, MenuItem, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DynamicTable from '../../../../components/DynamicTable';
import ParticipantForm from '../../../../components/ParticipantForm';
import { API } from '@/app/config/apiConfig';

const ParticipantModule = () => {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const fetchWorkshops = async () => {
    try {
      const response = await API.get('workshops');
      setWorkshops(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchParticipants = async (workshopId) => {
    setLoading(true);
    try {
      const response = await API.get(`workshops/${workshopId}`);
      setParticipants(response.data.participants || []);
      setTotalItems(response.data.participants.length || 0);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  useEffect(() => {
    if (selectedWorkshop) {
      fetchParticipants(selectedWorkshop);
    }
  }, [selectedWorkshop]);

  const handleRegisterParticipant = async (formData) => {
    try {
      await API.post('workshops/register', {
        workshopId: selectedWorkshop,
        ...formData,
      });
      fetchParticipants(selectedWorkshop);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateParticipant = async (formData) => {
    try {
      await API.put(
        `workshops/${selectedWorkshop}/participants/${selectedParticipant._id}`,
        formData
      );
      fetchParticipants(selectedWorkshop);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteParticipant = async (participantId) => {
    if (confirm('Are you sure you want to delete this participant?')) {
      try {
        await API.delete(
          `workshops/${selectedWorkshop}/participants/${participantId}`
        );
        fetchParticipants(selectedWorkshop);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'fullName', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'payment', label: 'Payment' },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <Box>
          <IconButton
            onClick={() => {
              setSelectedParticipant(row);
              setOpenForm(true);
            }}
            color="primary"
          >
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteParticipant(row._id)} color="error">
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" color="#106861">
          Participant Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            label="Select Workshop"
            value={selectedWorkshop}
            onChange={(e) => setSelectedWorkshop(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Select a workshop</MenuItem>
            {workshops.map((workshop) => (
              <MenuItem key={workshop._id} value={workshop._id}>
                {workshop.workshopName}
              </MenuItem>
            ))}
          </TextField>
          {selectedWorkshop && (
            <Button
              variant="contained"
              sx={{ backgroundColor: '#106861', '&:hover': { backgroundColor: '#0e5b54' } }}
              onClick={() => {
                setSelectedParticipant(null);
                setOpenForm(true);
              }}
            >
              Register Participant
            </Button>
          )}
        </Box>
      </Box>

      {selectedWorkshop ? (
        <DynamicTable
          columns={columns}
          data={participants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          loading={loading}
          error={error}
          totalItems={totalItems}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      ) : (
        <Typography align="center" sx={{ mt: 3, color: '#106861' }}>
          Please select a workshop to manage participants.
        </Typography>
      )}

      <ParticipantForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={selectedParticipant ? handleUpdateParticipant : handleRegisterParticipant}
        initialData={selectedParticipant || {}}
      />
    </Box>
  );
};

export default ParticipantModule;