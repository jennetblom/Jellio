
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const deleteListInDb = async (boardId: string, listId: string) => {
    try {

        const listRef = doc(db, "boards", boardId, "lists", listId);
        await deleteDoc(listRef);

        console.log("List deleted succesfully");
        return true;
    } catch (error) {
        console.log("error deleting list from firestore", error);
        return false;
    }
}


