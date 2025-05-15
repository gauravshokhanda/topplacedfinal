'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem,
    TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DynamicTable from '@/components/DynamicTable';
import StudentFormModal from './StudentFormModal';
import { API } from '../../../config/apiConfig';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [editStudent, setEditStudent] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [confirmDelete, setConfirmDelete] = useState({ open: false, student: null });

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuRow, setMenuRow] = useState(null);

    const [openCardModal, setOpenCardModal] = useState(false);
    const [cardStudent, setCardStudent] = useState(null);
    const [cardFields, setCardFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [jobRoleId, setJobRoleId] = useState('');

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await API.get('auth/students');
            setStudents(res.data);
        } catch (err) {
            setError('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleEdit = (student) => {
        setEditStudent(student);
        setOpenModal(true);
    };

    const handleDelete = async () => {
        if (!confirmDelete.student) return;
        try {
            await API.delete(`/auth/users/${confirmDelete.student._id}`);
            fetchStudents();
            setConfirmDelete({ open: false, student: null });
        } catch (err) {
            alert('Delete failed');
        }
    };

    const handleVerify = async (student) => {
        try {
            const position = student?.profile?.studentDetails?.position;
            if (!position) return alert('No position set for this student.');

            const roles = await API.get('/job-roles');
            const role = roles.data.find((r) => r.name === position);
            if (!role) return alert(`No job role found for "${position}"`);

            const templateRes = await API.get(`/job-role-templates/${role._id}`);
            const fields = templateRes.data?.fields || [];

            setJobRoleId(role._id);
            setCardFields(fields);
            setCardStudent(student);
            setFormData({});
            setOpenCardModal(true);
        } catch (err) {
            alert('Something went wrong.');
            console.error(err);
        }
    };

    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setMenuRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuRow(null);
    };

    const handleSave = () => {
        setOpenModal(false);
        fetchStudents();
    };

    const handleCardSubmit = async () => {
        try {
            const filledFields = Object.entries(formData).map(([label, value]) => ({ label, value }));
            await API.post(`/job-cards/${cardStudent._id}`, {
                filledFields,
                assignedBy: cardStudent._id // 🔥 Using student._id as assignedBy (as per your instruction)
            });
            alert('Job card submitted!');
            setOpenCardModal(false);
        } catch (err) {
            alert('Failed to submit job card');
            console.error(err);
        }
    };

    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        {
            id: 'actions',
            label: 'Actions',
            render: (row) => (
                <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                    <MoreVertIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box p={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold" color="#106861">Students</Typography>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#106861' }}
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setEditStudent(null);
                        setOpenModal(true);
                    }}
                >
                    Add Student
                </Button>
            </Stack>

            <DynamicTable
                columns={columns}
                data={students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                loading={loading}
                error={error}
                totalItems={students.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
            />

            <StudentFormModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleSave}
                student={editStudent}
            />

            <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, student: null })}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete <b>{confirmDelete.student?.name}</b>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete({ open: false, student: null })}>Cancel</Button>
                    <Button color="error" onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => { handleEdit(menuRow); handleMenuClose(); }}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
                </MenuItem>
                <MenuItem onClick={() => { setConfirmDelete({ open: true, student: menuRow }); handleMenuClose(); }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
                </MenuItem>
                <MenuItem onClick={() => { handleVerify(menuRow); handleMenuClose(); }}>
                    Jobcard
                </MenuItem>
            </Menu>

            <Dialog open={openCardModal} onClose={() => setOpenCardModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Jobcard of {cardStudent?.name}</DialogTitle>
                <DialogContent>
                    {cardFields.map((field, idx) => (
                        <TextField
                            key={idx}
                            label={field.name}
                            type={field.type === 'number' ? 'number' : 'text'}
                            fullWidth
                            sx={{ mb: 2 }}
                            value={formData[field.name] || ''}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
                            }
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCardModal(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCardSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentList;
