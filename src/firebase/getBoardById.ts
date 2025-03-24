import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BoardType } from "../types";

export const getBoardById = async (boardId: string): Promise<BoardType | null> => {
    const boardRef = doc(db, 'boards', boardId);
    const docSnapshot = await getDoc(boardRef);

    const currentDate = new Date();
    const timestamp = Timestamp.fromDate(currentDate);
    if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        return {
            id: docSnapshot.id,
            title: data.title || "Unnamed board",
            color: data.color || "",
            userId: data.userId || "",
            username: data.username || "",
            createdAt: data.createdAt || timestamp,
            members: data.members || [],
        }
    } else {
        console.log("Board not found");
        return null;
    }
}