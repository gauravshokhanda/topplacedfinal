'use client';

import { useState, useEffect } from 'react';
import {
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DynamicTable from '../../../../components/DynamicTable';
import WorkshopForm from '../../../../components/WorkshopForm';
import ParticipantForm from '../../../../components/ParticipantForm';
import {API} from "../../../config/apiConfig"

const WorkshopModule = () => {
  // Workshop states
  const [workshops, setWorkshops] = useState([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(false);
  const [errorWorkshops, setErrorWorkshops] = useState(null);
  const [pageWorkshops, setPageWorkshops] = useState(0);
  const [rowsPerPageWorkshops, setRowsPerPageWorkshops] = useState(5);
  const [totalItemsWorkshops, setTotalItemsWorkshops] = useState(0);
  const [openWorkshopForm, setOpenWorkshopForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // Participant states
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [errorParticipants, setErrorParticipants] = useState(null);
  const [pageParticipants, setPageParticipants] = useState(0);
  const [rowsPerPageParticipants, setRowsPerPageParticipants] = useState(5);
  const [totalItemsParticipants, setTotalItemsParticipants] = useState(0);
  const [openParticipantModal, setOpenParticipantModal] = useState(false);
  const [openParticipantForm, setOpenParticipantForm] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [currentWorkshopId, setCurrentWorkshopId] = useState(null);

  // Fetch all workshops
  const fetchWorkshops = async () => {
    setLoadingWorkshops(true);
    try {
      const response = await API.get('workshops');
      setWorkshops(response.data);
      setTotalItemsWorkshops(response.data.length);
      setErrorWorkshops(null);
    } catch (err) {
      setErrorWorkshops(err.message);
    } finally {
      setLoadingWorkshops(false);
    }
  };

  // Fetch participants for a specific workshop
  const fetchParticipants = async (workshopId) => {
    setLoadingParticipants(true);
    try {
      const response = await API.get(`workshops/${workshopId}`);
      setParticipants(response.data.participants || []);
      setTotalItemsParticipants(response.data.participants.length || 0);
      setErrorParticipants(null);
    } catch (err) {
      setErrorParticipants(err.message);
    } finally {
      setLoadingParticipants(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  // Workshop CRUD
  const handleCreateWorkshop = async (formData) => {
    try {
      await API.post('workshops', formData);
      fetchWorkshops();
    } catch (err) {
      setErrorWorkshops(err.message);
    }
  };

  const handleUpdateWorkshop = async (formData) => {
    try {
      await API.put(`workshops/${selectedWorkshop._id}`, formData);
      fetchWorkshops();
    } catch (err) {
      setErrorWorkshops(err.message);
    }
  };

  const handleDeleteWorkshop = async (workshopId) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
      try {
        await API.delete(`workshops/${workshopId}`);
        fetchWorkshops();
      } catch (err) {
        setErrorWorkshops(err.message);
      }
    }
  };

  // Participant CRUD
  const handleRegisterParticipant = async (formData) => {
    try {
      await API.post('workshops/register', {
        workshopId: currentWorkshopId,
        ...formData,
      });
      fetchParticipants(currentWorkshopId);
      fetchWorkshops();
    } catch (err) {
      setErrorParticipants(err.message);
    }
  };

  const handleUpdateParticipant = async (formData) => {
    try {
      await API.put(
        `workshops/${currentWorkshopId}/participants/${selectedParticipant._id}`,
        formData
      );
      fetchParticipants(currentWorkshopId);
      fetchWorkshops();
    } catch (err) {
      setErrorParticipants(err.message);
    }
  };

  const handleDeleteParticipant = async (participantId) => {
    if (confirm('Are you sure you want to delete this participant?')) {
      try {
        await API.delete(
          `workshops/${currentWorkshopId}/participants/${participantId}`
        );
        fetchParticipants(currentWorkshopId);
        fetchWorkshops();
      } catch (err) {
        setErrorParticipants(err.message);
      }
    }
  };

  // Pagination handlers for workshops
  const handlePageChangeWorkshops = (event, newPage) => {
    setPageWorkshops(newPage);
  };

  const handleRowsPerPageChangeWorkshops = (event) => {
    setRowsPerPageWorkshops(parseInt(event.target.value, 10));
    setPageWorkshops(0);
  };

  // Pagination handlers for participants
  const handlePageChangeParticipants = (event, newPage) => {
    setPageParticipants(newPage);
  };

  const handleRowsPerPageChangeParticipants = (event) => {
    setRowsPerPageParticipants(parseInt(event.target.value, 10));
    setPageParticipants(0);
  };

  // Workshop table columns
  const workshopColumns = [
    { id: 'workshopName', label: 'Workshop Name' },
    { id: 'dateTime', label: 'Date & Time', render: (row) => new Date(row.dateTime).toLocaleString() },
    { id: 'meetingLink', label: 'Meeting Link' },
    { id: 'price', label: 'Price' },
    { id: 'totalRegistered', label: 'Total Registered' },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <Box>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              setSelectedWorkshop(row);
              setOpenWorkshopForm(true);
            }}
            color="primary"
          >
            <Edit />
          </IconButton>
          <IconButton
          onClick={(event) => {
            event.stopPropagation(); 
            handleDeleteWorkshop(row._id);
          }}
          color="error"
        >
          <Delete />
        </IconButton>
        </Box>
      ),
    },
  ];

  // Participant table columns
  const participantColumns = [
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
              setOpenParticipantForm(true);
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
          Workshop Management
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#106861', '&:hover': { backgroundColor: '#0e5b54' } }}
          onClick={() => {
            setSelectedWorkshop(null);
            setOpenWorkshopForm(true);
          }}
        >
          Add Workshop
        </Button>
      </Box>

      <DynamicTable
        columns={workshopColumns}
        data={workshops.slice(pageWorkshops * rowsPerPageWorkshops, pageWorkshops * rowsPerPageWorkshops + rowsPerPageWorkshops)}
        loading={loadingWorkshops}
        error={errorWorkshops}
        totalItems={totalItemsWorkshops}
        page={pageWorkshops}
        rowsPerPage={rowsPerPageWorkshops}
        onPageChange={handlePageChangeWorkshops}
        onRowsPerPageChange={handleRowsPerPageChangeWorkshops}
        onRowClick={(row) => {
          setCurrentWorkshopId(row._id);
          fetchParticipants(row._id);
          setOpenParticipantModal(true);
        }}
      />

      {/* Workshop Form Modal */}
      <WorkshopForm
        open={openWorkshopForm}
        onClose={() => setOpenWorkshopForm(false)}
        onSubmit={selectedWorkshop ? handleUpdateWorkshop : handleCreateWorkshop}
        initialData={selectedWorkshop || {}}
      />

      {/* Participant Table Modal */}
      <Dialog open={openParticipantModal} onClose={() => setOpenParticipantModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          Participants for Workshop
          <Button
            variant="contained"
            sx={{ ml: 2, backgroundColor: '#106861', '&:hover': { backgroundColor: '#0e5b54' } }}
            onClick={() => {
              setSelectedParticipant(null);
              setOpenParticipantForm(true);
            }}
          >
            Register Participant
          </Button>
        </DialogTitle>
        <DialogContent>
          <DynamicTable
            columns={participantColumns}
            data={participants.slice(pageParticipants * rowsPerPageParticipants, pageParticipants * rowsPerPageParticipants + rowsPerPageParticipants)}
            loading={loadingParticipants}
            error={errorParticipants}
            totalItems={totalItemsParticipants}
            page={pageParticipants}
            rowsPerPage={rowsPerPageParticipants}
            onPageChange={handlePageChangeParticipants}
            onRowsPerPageChange={handleRowsPerPageChangeParticipants}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenParticipantModal(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Participant Form Modal */}
      <ParticipantForm
        open={openParticipantForm}
        onClose={() => setOpenParticipantForm(false)}
        onSubmit={selectedParticipant ? handleUpdateParticipant : handleRegisterParticipant}
        initialData={selectedParticipant || {}}
      />
    </Box>
  );
};

export default WorkshopModule;