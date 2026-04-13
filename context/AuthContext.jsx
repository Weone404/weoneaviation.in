// context/AuthContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuth, logout } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined); // undefined = loading, null = logged out

    useEffect(() => {
        const unsubscribe = onAuth((firebaseUser) => {
            setUser(firebaseUser ?? null);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook — use anywhere: const { user, logout } = useAuth();
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}