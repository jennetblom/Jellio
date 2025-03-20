import { arrayUnion, doc,  updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { CardType} from "../types";

export const addCardToDb = async (boardId: string, listId: string, newCard: CardType) => {
    try {
        const listRef = doc(db, "boards", boardId, "lists", listId);
        console.log("listRef", listId);
        await updateDoc(listRef, {
            cards: arrayUnion(newCard)
        });
        console.log("Card added to list");
        return true; 
    } catch (error) {
        console.error("Error adding card to Firestore:", error);
        return false; 
    }
}
/* 
export const addCardToDb = async (boardId: string, listId: number, newCard: CardType) => {
    try {
        const cardRef = doc(db, "boards", boardId, "lists", listId.toString(), "cards", newCard.id.toString());

        await setDoc(cardRef, newCard);

        return true; 
    } catch (error) {
        console.error("Error adding card to Firestore:", error);
        return false; 
    }
} */




/* export const addCardToDb = async (boardId: string, listId: number, newCard: CardType) => {
    try {
        const boardRef = doc(db, "boards", boardId);
        const boardSnap = await getDoc(boardRef);

        if (!boardSnap.exists()) {
            console.error("Board does not exist!");
            return false;
        }

        const boardData = boardSnap.data();
        const lists = boardData.lists || [];

        const listIndex = lists.findIndex((list: ListType) => list.id === listId);

        if (listIndex === -1) {
            console.error("List does not exist!");
            return false;
        }
        lists[listIndex] = {
            ...lists[listIndex],
            cards: [...lists[listIndex].cards, newCard],
        };


        await updateDoc(boardRef, { lists});

        return true; 
    } catch (error) {
        console.error("Error adding card to Firestore:", error);
        return false; 
    }
} */