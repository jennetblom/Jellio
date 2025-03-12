import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Board } from '../types';
import { useAuth } from "../context/AuthContext";

export const getUserBoards = async (): Promise<Board[]> => {
    const { user } = useAuth();
    if (!user) return [];

    try {
        const q = query(collection(db, "boards"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || "Unnamed board",
                color: data.color || "",
                lists: data.lists || [],
            };

        });
    } catch (error) {
        console.error("Error fetching boards");
        return [];
    }
}