import React, { useState } from 'react';
import { apiFetch } from '../services/api.ts';
import { TextField, Button, Snackbar, Alert } from '@mui/material';

// LoginForm component for user authentication
const LoginForm = () => {
    const [username, setUsername] = useState(''); // State to store the username
    const [password, setPassword] = useState(''); // State to store the password
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' }); // State for notifications

    // Handle the login process
    const handleLogin = async () => {
        try {
            const response = await apiFetch('/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Store the token in local storage and show success notification
            localStorage.setItem('token', response.token);
            setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
            setTimeout(() => {
                window.location.href = '/dashboard'; // Redirect to Dashboard after notification
            }, 1000); // Add a delay to allow the notification to be displayed
        } catch (error) {
            setSnackbar({ open: true, message: `Login failed: ${(error as Error).message}`, severity: 'error' });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Login</h1>
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: '15px', width: '300px' }}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '15px', width: '300px' }}
            />
            <Button variant="contained" onClick={handleLogin}>
                Login
            </Button>

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

export default LoginForm;
