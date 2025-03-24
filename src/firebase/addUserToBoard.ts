import { doc , updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addUserToBoard = async(boardId: string, userId: string) => {
    const boardRef = doc(db, "boards", boardId);
    const boardSnap = await getDoc(boardRef);

    
    await updateDoc(boardRef, {
        members: arrayUnion(userId),
    });
};