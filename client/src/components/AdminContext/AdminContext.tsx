import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
    isAdmin: boolean;
    loginAsAdmin: (password: string) => boolean;
    logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        // טוען את הסטטוס מה-localStorage בהעלאת העמוד
        const stored = localStorage.getItem("isAdmin");
        if (stored === "true") {
            setIsAdmin(true);
        }
    }, []);

    const loginAsAdmin = (password: string): boolean => {
        if (password === "1234admin") { // כאן את יכולה להחליף את הסיסמה הרצויה
            setIsAdmin(true);
            localStorage.setItem("isAdmin", "true");
            return true;
        }
        return false;
    };

    const logoutAdmin = () => {
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
    };

    return (
        <AdminContext.Provider value={{ isAdmin, loginAsAdmin, logoutAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = (): AdminContextType => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
};
