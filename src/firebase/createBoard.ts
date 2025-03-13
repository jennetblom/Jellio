import { collection, doc, documentId, setDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';


export const createBoard = async (userId: string, title: string, color: string) => {
    const boardsref = collection(db, 'boards');
    const newBoardRef = doc(boardsref);
    const newBoardId = newBoardRef.id;
    try {
        await setDoc(newBoardRef, {
            id: newBoardId,
            title: title,
            color: color,
            userId: userId,
            lists: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log("Success writing doucment", documentId);
    } catch(error) {
        console.log("Error fetching doucment");
    }
    
}
