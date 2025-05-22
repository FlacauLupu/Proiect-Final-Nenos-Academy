const BASE_URL = 'http://localhost:5000'; // Base URL for the API

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization header if token exists
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...headers,
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed'); // Throw an error if the response is not ok
        }

        return response.json(); // Return the response data as JSON
    } catch (error) {
        throw new Error(error.message || 'Network error'); // Handle network errors
    }
};
