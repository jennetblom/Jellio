import { doc, updateDoc } from "firebase/firestore";
import { ListType } from "../../types";
import { db } from "../../firebaseConfig";

export const updateListInDb = async( boardId: string, listId: string, updatedFields: Partial<ListType>) => {

    try {
        const listRef = doc(db, 'boards', boardId, 'lists', listId.toString());
        await updateDoc(listRef, updatedFields);
        console.log("List updated in db", updatedFields);
        return true;


    } catch(error) {
        console.log("error updating list in db", error);
        return false;
    }
}

//example usage
//updateListInDb("board123", 1, { title: "Updated List Name" });


