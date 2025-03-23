import { ListType } from "../types";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

export const addListToDb = async (boardId: string, listTitle: string, lists: ListType[]) => {
    try {
        const listRef = doc(collection(db, "boards", boardId, "lists"));

        const newList: ListType = {
            id: listRef.id,
            title: listTitle,
            cards: [],
            index: lists.length
        }

        await setDoc(listRef, newList);

        console.log('List created successfully:', listRef.id);
        return newList;

    } catch (error) {
        console.log("error adding list to firestore", error);
        return false;
    }
}
