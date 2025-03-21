import { signOut, User } from "firebase/auth";
import { createContext, ReactNode, useContext,  useState } from "react";
import { auth } from "../firebaseConfig";

import { Timestamp } from "firebase/firestore";

interface UserType extends User {
    userId: string;
    username: string | null;
    email: string | null;
    profilePic: string | null;
    createdAt: Timestamp;
}
interface AuthContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    loading: boolean;
    logout: () => Promise<void>;
}
interface AuthProviderProps {
    children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);


    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}