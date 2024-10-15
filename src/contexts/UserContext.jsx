import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(() => {
        const item = window.localStorage.getItem("loggedIn");

        if (!item) {
            window.localStorage.setItem("loggedIn", false);
            return false;
        }

        return item === "true" ?? false;
    });

    function toggleLoggedIn() {
        setLoggedIn(!loggedIn);
        window.localStorage.setItem("loggedIn", !loggedIn);
    }

    return (
        <UserContext.Provider value={{ loggedIn, toggleLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}