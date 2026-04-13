// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuth, logout } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // undefined = still loading, null = logged out, object = logged in
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuth((firebaseUser) => {
            setUser(firebaseUser ?? null);
            setLoading(false);
        });
        return unsubscribe; // cleanup on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Use this hook in any page:
// const { user, loading, logout } = useAuth();
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}