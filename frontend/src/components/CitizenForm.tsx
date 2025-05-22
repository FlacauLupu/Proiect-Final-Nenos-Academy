import React, { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from React
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, SelectChangeEvent } from '@mui/material'; // Import Material-UI components
import { apiFetch } from '../services/api.ts'; // Import the apiFetch function from the api service

// Define the CitizenFormProps interface
interface CitizenFormProps {
    initialData?: any;
    onSuccess: () => void;
}

// Define the CitizenForm component
const CitizenForm: React.FC<CitizenFormProps> = ({ initialData, onSuccess }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        address: '',
        marital_status: '',
        citizenship: '',
    });

    // Snackbar state for displaying success or error messages
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Update form data when initial data changes
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => { // e = the object of the event
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Create a copy of the current state of the form and update the specific field (determined by namme) with a value
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const method = initialData ? 'PUT' : 'POST'; // Use PUT for updating an existing citizen, POST for creating a new citizen
            const url = initialData ? `/citizens/${initialData.id}` : '/citizens'; // Use the appropriate URL based on initial data
            const response = await apiFetch(url, { // Send a POST or PUT request to the server
                method,
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });

            // Display a success message in the Snackbar
            const result = await response;
            setSnackbar({ open: true, message: result.message, severity: 'success' });
            // Clear the form after submission
            setFormData({
                first_name: '',
                last_name: '',
                birth_date: '',
                address: '',
                marital_status: '',
                citizenship: '',
            });
            onSuccess();
        } catch (error) {
            setSnackbar({ open: true, message: `Error: ${(error as Error).message}`, severity: 'error' });
        }
    };

    // Render the form with input fields for citizen data
    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                    <TextField
                        name="first_name"
                        label="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                    <TextField
                        name="last_name"
                        label="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                    <TextField
                        name="birth_date"
                        label="Birth Date"
                        type="date"
                        value={formData.birth_date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                    <TextField
                        name="address"
                        label="Address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                        name="marital_status"
                        value={formData.marital_status}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="married">Married</MenuItem>
                        <MenuItem value="divorced">Divorced</MenuItem>
                        <MenuItem value="widowed">Widowed</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                    <TextField
                        name="citizenship"
                        label="Citizenship"
                        value={formData.citizenship}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    {initialData ? 'Update Citizen' : 'Add Citizen'}
                </Button>
            </form>

            {/* Snackbar for displaying success or error messages */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity as 'success' | 'error'}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    );
};

// Export the CitizenForm component
export default CitizenForm;