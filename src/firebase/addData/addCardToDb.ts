import { arrayUnion, doc,  updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { CardType} from "../../types";

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
