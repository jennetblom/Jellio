import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from "../context/AuthContext";
import { User } from 'firebase/auth';

export const getUserBoards = async (user: User) => {
 
    if (!user) return [];

    try {
        const q = query(collection(db, "boards"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const boards = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || "Unnamed board", 
                color: data.color || "",
                userId: data.userId || "",
                lists: data.lists || [],
                createdAt: data.createdAt || new Date(),
                updatedAt: data.updatedAt || new Date(), 
            };
        });
        return boards;
    } catch (error) {
        console.error("Error fetching boards");
        return [];
    }
}