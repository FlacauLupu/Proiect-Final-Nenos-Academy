import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, TablePagination,
} from '@mui/material';
import { apiFetch } from '../services/api.ts';

// Component to display and manage a table of citizens
const CitizensTable = ({ refreshKey, onEdit, onRefresh }: { refreshKey: number; onEdit: (citizen: any) => void; onRefresh: () => void }) => {
    const [citizens, setCitizens] = useState([]); // State to store the list of citizens
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
    const [openDialog, setOpenDialog] = useState(false); // State to control the delete confirmation dialog
    const [deleteId, setDeleteId] = useState<number | null>(null); // State to store the ID of the citizen to be deleted
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' }); // State to control the snackbar for notifications
    const [page, setPage] = useState(0); // State to control the current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // State to control the number of rows per page

    // Fetch citizens from the backend
    const fetchCitizens = async () => {
        try {
            const response = await apiFetch('/citizens');
            setCitizens(response);
        } catch (error) {
            console.error(`Failed to fetch citizens: ${(error as Error).message}`);
        }
    };

    // Fetch citizens whenever the refreshKey changes
    useEffect(() => {
        fetchCitizens();
    }, [refreshKey]);

    // Filter citizens based on the search query
    const filteredCitizens = citizens.filter((citizen: any) =>
        citizen.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        citizen.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        citizen.address.toLowerCase().includes(searchQuery.toLowerCase()) 
    );

    // Handle the deletion of a citizen
    const handleDelete = async () => {
        try {
            await apiFetch(`/citizens/${deleteId}`, { method: 'DELETE' });
            setDeleteId(null);
            setOpenDialog(false);
            setSnackbar({ open: true, message: 'Citizen deleted successfully!', severity: 'success' });
            onRefresh();
        } catch (error) {
            setSnackbar({ open: true, message: `Error: ${(error as Error).message}`, severity: 'error' });
        }
    };

    // Handle the edit action
    const handleEdit = (citizen: any) => {
        const citizenWithBirthDate = {
            ...citizen,
            birth_date: new Date(citizen.birth_date).toISOString().split('T')[0] // Format date to YYYY-MM-DD
        };
        onEdit(citizenWithBirthDate);
    };

    // Handle page change
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            {/* Search bar for filtering citizens */}
            <Box sx={{ marginBottom: '20px' }}>
                <TextField
                    label="Search Citizens"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            {/* Table to display the list of citizens */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Birth Date</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Marital Status</TableCell>
                            <TableCell>Citizenship</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCitizens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((citizen: any) => (
                            <TableRow key={citizen.id}>
                                <TableCell>{citizen.id}</TableCell>
                                <TableCell>{citizen.first_name}</TableCell>
                                <TableCell>{citizen.last_name}</TableCell>
                                <TableCell>{new Date(citizen.birth_date).toLocaleDateString()}</TableCell>
                                <TableCell>{citizen.address}</TableCell>
                                <TableCell>{citizen.marital_status}</TableCell>
                                <TableCell>{citizen.citizenship}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ marginRight: '10px' }}
                                        onClick={() => handleEdit(citizen)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteId(citizen.id);
                                            setOpenDialog(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredCitizens.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Dialog to confirm deletion */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this citizen?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity as 'success' | 'error'}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
};

export default CitizensTable;
