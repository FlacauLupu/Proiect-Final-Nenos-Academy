import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Switch, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { lightTheme, darkTheme } from './themes.ts';
import Dashboard from './pages/Dashboard.tsx';
import LoginPage from './pages/LoginPage.tsx';

// Main App component
const App = () => {
    const [darkMode, setDarkMode] = useState(false); // State to manage theme mode

    // Toggle theme mode
    const handleThemeChange = () => {
        setDarkMode((prev) => !prev);
    };

    // Check authentication based on token in localStorage
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Citizen Management Dashboard
                        </Typography>
                        <Box>
                            <Typography variant="body1" sx={{ display: 'inline', marginRight: '10px' }}>
                                {darkMode ? 'Dark Mode' : 'Light Mode'}
                            </Typography>
                            <Switch checked={darkMode} onChange={handleThemeChange} />
                        </Box>
                    </Toolbar>
                </AppBar>
                <Routes>
                    {/* Main route redirects user based on authentication */}
                    <Route
                        path="/"
                        element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />}
                    />
                    {/* Login page */}
                    <Route path="/login" element={<LoginPage />} />
                    {/* Protected dashboard */}
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
