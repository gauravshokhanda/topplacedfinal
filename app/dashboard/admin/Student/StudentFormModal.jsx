import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from '@mui/material';
import { API } from '../../../config/apiConfig';

const StudentFormModal = ({ open, onClose, onSave, student }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (student) {
            setForm({
                name: student.name || '',
                email: student.email || '',
                password: '',
            });
        } else {
            setForm({ name: '', email: '', password: '' });
        }
    }, [student]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            if (student) {
                await API.put(`/auth/users/${student._id}`, form);
            } else {
                await API.post('/auth/register', { ...form, role: 'Student' });
            }
            onSave();
        } catch (err) {
            alert('Failed to save student');
            console.error(err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{student ? 'Edit Student' : 'Add Student'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    {!student && (
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    {student ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StudentFormModal;
