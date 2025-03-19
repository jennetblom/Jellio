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
/* export const addListToDb = async (boardId: string, newList: ListType) => {
    try {
        const listRef = doc(collection(db, "boards", boardId, "lists"));

        const data = {
            ...newList,
            id: listRef.id,
        }
  
        await setDoc(listRef, data);            
        console.log('List created successfully:', listRef.id);
        return {id: listRef.id};

    } catch (error) {
        console.log("error adding list to firestore", error);
        return false;
    }
} */




/* export const addListToDb = async (boardId: string, newList: ListType) => {
    try {
        const listRef = doc(db, "boards", boardId, "lists", newList.id.toString());


        
        await setDoc(listRef, newList);
        return true;

    } catch (error) {
        console.log("error adding list to firestore", error);
        return false;
    }
} */



/* export const addListToBoard = async (boardId: string, newList: ListType) => {
    try {
        const boardRef = doc(db, "boards", boardId);

        await updateDoc(boardRef, {lists: arrayUnion(newList)})
        return true;

    } catch (error) {
        console.log("error adding list to firestore", error);
        return false;
    }
} */