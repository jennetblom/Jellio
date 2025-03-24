import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

import { doc, getDoc, Timestamp } from "firebase/firestore";

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
    const currentDate = new Date();
    const timestamp = Timestamp.fromDate(currentDate);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userRef = doc(db, "users", firebaseUser.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setUser({
                        ...firebaseUser,
                        userId: firebaseUser.uid,
                        username: userData.username || "No username",
                        email: userData.email || "No email",
                        profilePic: userData.profilePic || "",
                        createdAt: userData.createdAt ||timestamp,
                    });
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Avslutar lyssnaren vid unmount
    }, []);
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