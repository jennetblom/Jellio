
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


/* export const deleteList = async (boardId: string, listId: number) => {
    try {
        // Get reference to the board
        const boardRef = doc(db, "boards", boardId);
        
        // Get the board document to check its data
        const boardSnap = await getDoc(boardRef);
        
        // If the board doesn't exist, return false
        if (!boardSnap.exists()) {
            console.error("Board does not exist!");
            return false;
        }

        const boardData = boardSnap.data();
        
        // Find the list to remove using its id
        const updatedLists = boardData.lists.filter((list: { id: number }) => list.id !== listId);

        // Update the board with the new list array, excluding the deleted list
        await updateDoc(boardRef, {
            lists: updatedLists
        });

        console.log("List deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting list from Firestore", error);
        return false;
    }
}; */