import { db } from "../../firebaseConfig";
import { doc, writeBatch } from "firebase/firestore";
import { ListType } from "../../types";


export const updateListOrder = async(boardId: string, newLists: ListType[]) => {
    if(!boardId || newLists.length === 0) return;

    const batch = writeBatch(db);

    newLists.forEach((list, index) => {
        const listRef = doc(db, "boards", boardId, "lists", list.id);
        batch.update(listRef, {index});
    })

    try {
        await batch.commit();
        console.log("update list order");
    } catch(error){
        console.log("error updating order", error);
    }
}
