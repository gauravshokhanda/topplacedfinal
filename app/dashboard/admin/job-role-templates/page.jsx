'use client';

import { useEffect, useState } from 'react';
import {
    Box, Button, Stack, Typography, IconButton, MenuItem,
    TextField, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { Add, Delete, Save } from '@mui/icons-material';
import { API } from '../../../config/apiConfig';
import DynamicTable from '@/components/DynamicTable';

const JobRoleTemplatesPage = () => {
    const [jobRoles, setJobRoles] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState('');
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchRoles = async () => {
        const res = await API.get('/job-roles');
        setJobRoles(res.data);
    };

    const fetchTemplates = async () => {
        const res = await API.get('/job-role-templates');
        setTemplates(res.data);
    };

    useEffect(() => {
        fetchRoles();
        fetchTemplates();
    }, []);

    const handleAddField = () => {
        setFields([...fields, { name: '', type: 'text' }]);
    };

    const handleFieldChange = (index, key, value) => {
        const updated = [...fields];
        updated[index][key] = value;
        setFields(updated);
    };

    const handleDeleteTemplate = async (id) => {
        await API.delete(`/job-role-templates/${id}`);
        fetchTemplates();
    };

    const handleSaveTemplate = async () => {
        const existing = templates.find(t => t.jobRole._id === selectedRoleId);
        if (existing) {
            await API.put(`/job-role-templates/${existing._id}`, { jobRole: selectedRoleId, fields });
        } else {
            await API.post('/job-role-templates', { jobRole: selectedRoleId, fields });
        }
        fetchTemplates();
        setOpen(false);
        setFields([]);
        setSelectedRoleId('');
    };

    const columns = [
        { id: 'jobRole', label: 'Role', render: row => row.jobRole?.name },
        {
            id: 'fields', label: 'Fields', render: row =>
                row.fields.map(f => `${f.name} (${f.type})`).join(', ')
        },
        {
            id: 'actions', label: 'Actions', render: (row) => (
                <IconButton onClick={() => handleDeleteTemplate(row._id)}><Delete /></IconButton>
            )
        }
    ];

    return (
        <Box p={3}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
                <Typography variant="h5" fontWeight="bold" color="#106861">Job Role Templates</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add/Edit Template</Button>
            </Stack>

            <DynamicTable
                columns={columns}
                data={templates}
                loading={loading}
                error={null}
                totalItems={templates.length}
                page={0}
                rowsPerPage={templates.length}
                onPageChange={() => { }}
                onRowsPerPageChange={() => { }}
            />

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Set Fields for Job Role</DialogTitle>
                <DialogContent>
                    <TextField
                        select fullWidth label="Select Job Role" value={selectedRoleId}
                        onChange={(e) => setSelectedRoleId(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        {jobRoles.map(role => (
                            <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
                        ))}
                    </TextField>

                    {fields.map((field, idx) => (
                        <Stack key={idx} direction="row" spacing={2} sx={{ mb: 1 }}>
                            <TextField
                                label="Field Name" fullWidth value={field.name}
                                onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                            />
                            <TextField
                                select label="Type" value={field.type}
                                onChange={(e) => handleFieldChange(idx, 'type', e.target.value)}
                            >
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="number">Number</MenuItem>
                                <MenuItem value="select">Select</MenuItem>
                                <MenuItem value="boolean">Yes/No</MenuItem>
                            </TextField>
                        </Stack>
                    ))}

                    <Button onClick={handleAddField} startIcon={<Add />}>Add Field</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" startIcon={<Save />} onClick={handleSaveTemplate}>Save Template</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default JobRoleTemplatesPage;
