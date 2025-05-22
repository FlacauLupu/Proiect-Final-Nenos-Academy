import React, { useState } from 'react';
import { Typography, Container, Box } from '@mui/material';
import CitizensTable from '../components/CitizensTable.tsx';
import CitizenForm from '../components/CitizenForm.tsx';

// Dashboard component to manage citizens
const Dashboard = () => {
    const [refreshKey, setRefreshKey] = useState(0); // State to trigger table refresh
    const [editingCitizen, setEditingCitizen] = useState(null); // State to store the citizen being edited

    // Function to force table refresh
    const refreshCitizens = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    // Handle edit action
    const handleEdit = (citizen) => {
        setEditingCitizen(citizen);
    };

    return (
        <div>
            {/* Page content */}
            <Container>
                {/* Section to view citizens */}
                <Box sx={{ marginTop: '20px', marginBottom: '40px' }}>
                    <Typography variant="h4" gutterBottom>
                        Citizens
                    </Typography>
                    <CitizensTable refreshKey={refreshKey} onEdit={handleEdit} onRefresh={refreshCitizens} />
                </Box>

                {/* Section to add/edit citizens */}
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        {editingCitizen ? 'Edit Citizen' : 'Add Citizen'}
                    </Typography>
                    <CitizenForm
                        initialData={editingCitizen}
                        onSuccess={() => {
                            refreshCitizens(); // Refresh the list of citizens
                            setEditingCitizen(null); // Reset the form after saving
                        }}
                    />
                </Box>
            </Container>
        </div>
    );
};

export default Dashboard;
