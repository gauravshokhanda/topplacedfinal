'use client';

import { useEffect, useState } from 'react';
import {
  Box, Button, Stack, Typography, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, MenuItem, Menu
} from '@mui/material';
import { Add, MoreVert, Edit, Delete, Save } from '@mui/icons-material';
import DynamicTable from '@/components/DynamicTable';
import { API } from '../../../config/apiConfig';

const JobRolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [templateFields, setTemplateFields] = useState([]);

  const fetchRoles = async () => {
    setLoading(true);
    const res = await API.get('/job-roles');
    setRoles(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSaveRole = async () => {
    if (editRole) {
      await API.put(`/job-roles/${editRole._id}`, { name });
    } else {
      await API.post('/job-roles', { name });
    }
    fetchRoles();
    setOpen(false);
    setName('');
    setEditRole(null);
  };

  const handleDelete = async (id) => {
    await API.delete(`/job-roles/${id}`);
    fetchRoles();
  };

  const handleOpenMenu = (event, role) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRole(role);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    // Do not clear selectedRole here
  };

  const handleOpenTemplateDialog = () => {
    if (!selectedRole) {
      alert('No role selected');
      return;
    }

    setTemplateFields([]);
    setTemplateDialogOpen(true);
    handleCloseMenu();
  };

  const handleSaveTemplate = async () => {
    if (!selectedRole?._id) {
      alert("Selected role is missing. Cannot save template.");
      return;
    }

    try {
      await API.post('/job-role-templates', {
        jobRole: selectedRole._id,
        fields: templateFields,
      });
      setTemplateDialogOpen(false);
    } catch (err) {
      console.error('Failed to save template:', err);
      alert(`Failed to save template: ${err?.response?.data?.message || err?.message || 'unknown error'}`);
    }
  };

  const columns = [
    { id: 'name', label: 'Role Name' },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <IconButton onClick={(e) => handleOpenMenu(e, row)}>
          <MoreVert />
        </IconButton>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="#106861">Job Roles</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add Role</Button>
      </Stack>

      <DynamicTable
        columns={columns}
        data={roles}
        loading={loading}
        error={null}
        totalItems={roles.length}
        page={0}
        rowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />

      {/* Role Create/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editRole ? 'Edit' : 'Add'} Role</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Role Name" value={name} onChange={(e) => setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveRole} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* 3-Dot Action Menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => {
          setEditRole(selectedRole);
          setName(selectedRole.name);
          setOpen(true);
          handleCloseMenu();
        }}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => {
          handleDelete(selectedRole._id);
          handleCloseMenu();
        }}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
        <MenuItem onClick={handleOpenTemplateDialog}>
          📄 Template
        </MenuItem>
      </Menu>

      {/* Template Modal */}
      <Dialog open={templateDialogOpen} onClose={() => setTemplateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Create Template for "{selectedRole?.name || 'Unknown'}"
        </DialogTitle>
        <DialogContent>
          {templateFields.map((field, idx) => (
            <Stack direction="row" spacing={2} sx={{ mb: 1 }} key={idx}>
              <TextField
                label="Field Name"
                fullWidth
                value={field.name}
                onChange={(e) => {
                  const updated = [...templateFields];
                  updated[idx].name = e.target.value;
                  setTemplateFields(updated);
                }}
              />
              <TextField
                select
                label="Type"
                value={field.type}
                onChange={(e) => {
                  const updated = [...templateFields];
                  updated[idx].type = e.target.value;
                  setTemplateFields(updated);
                }}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value="boolean">Yes/No</MenuItem>
              </TextField>
            </Stack>
          ))}

          <Button sx={{ mt: 1 }} onClick={() => setTemplateFields([...templateFields, { name: '', type: 'text' }])}>
            Add Field
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTemplateDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSaveTemplate}>Save Template</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobRolesPage;
