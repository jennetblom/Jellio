import { ListType } from "../types";
import { db } from "../firebaseConfig";
import {  doc,  setDoc } from "firebase/firestore";

export const addListToDb = async (boardId: string, newList: ListType) => {
    try {
        const boardRef = doc(db, "boards", boardId, "lists", newList.id.toString());

        await setDoc(boardRef, newList);
        return true;

    } catch (error) {
        console.log("error adding list to firestore", error);
        return false;
    }
}


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