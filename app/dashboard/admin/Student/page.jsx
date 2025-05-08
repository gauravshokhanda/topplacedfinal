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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
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

    const handleSave = () => {
        setOpenModal(false);
        fetchStudents();
    };

    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        {
            id: 'actions',
            label: 'Actions',
            render: (row) => (
                <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(row)}><EditIcon /></IconButton>
                    <IconButton onClick={() => setConfirmDelete({ open: true, student: row })}><DeleteIcon /></IconButton>
                </Stack>
            ),
        },
    ];

    return (
        <Box p={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold" color="#106861">Students</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditStudent(null); setOpenModal(true); }}>
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
        </Box>
    );
};

export default StudentList;
