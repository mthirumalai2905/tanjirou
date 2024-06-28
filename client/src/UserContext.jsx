import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/profile');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setReady(true); // Set ready state regardless of success or failure
            }
        };

        if (!user) {
            fetchUserData();
        }
    }, [user]); // Fetch user data whenever user changes

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
