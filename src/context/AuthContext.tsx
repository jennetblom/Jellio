import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}
interface AuthProviderProps {
    children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const logout = async() => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{user, loading, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}