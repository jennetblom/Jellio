import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BoardType } from "../types";

export const getBoardById = async (boardId: string): Promise<BoardType | null> => {
    const boardRef = doc(db, 'boards', boardId);
    const docSnapshot = await getDoc(boardRef);

    if(docSnapshot.exists()) {
        const data = docSnapshot.data();
        
        return {
            id: docSnapshot.id,
            title: data.title || "Unnamed board", 
            color: data.color || "",
            userId: data.userId || "",
            lists: data.lists || [],
            createdAt: data.createdAt || new Date(),
            updatedAt: data.updatedAt || new Date(), 
        }
    } else {
        console.log("Board not found");
        return null;
    }
}