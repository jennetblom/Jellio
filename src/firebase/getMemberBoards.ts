import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { User } from 'firebase/auth';

export const getMemberBoards = async (user: User) => {

    if (!user) return [];

    try {
        const q = query(collection(db, "boards"), where("members", "array-contains", user.uid));
        const querySnapshot = await getDocs(q);
        const currentDate = new Date();
        const timestamp = Timestamp.fromDate(currentDate);
        const boards = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title || "Unnamed board",
                color: data.color || "",
                userId: data.userId || "",
                username: data.username || "",
                createdAt: data.createdAt || timestamp,
                members: data.members || [],
            };
        });
        return boards;
    } catch (error) {
        console.error("Error fetching boards");
        return [];
    }
}