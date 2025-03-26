import { collection, doc,  setDoc, Timestamp } from "firebase/firestore";
import { db } from '../../firebaseConfig';


export const createBoardInDb = async (userId: string, username: string, title: string, color: string) => {
    const boardsref = collection(db, 'boards');
    const newBoardRef = doc(boardsref);
    const newBoardId = newBoardRef.id;
    const currentDate = new Date();
    const timestamp = Timestamp.fromDate(currentDate);
    try {
        await setDoc(newBoardRef, {
            id: newBoardId,
            title: title,
            color: color,
            userId: userId,
            username: username,
            createdAt: timestamp,
            members: [],
        });
        console.log("Success writing doucment");
    } catch (error) {
        console.log("Error fetching doucment");
    }

}
