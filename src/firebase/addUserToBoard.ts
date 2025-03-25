import { doc , updateDoc, arrayUnion} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addUserToBoard = async(boardId: string, userId: string) => {
    const boardRef = doc(db, "boards", boardId);

    
    await updateDoc(boardRef, {
        members: arrayUnion(userId),
    });
};