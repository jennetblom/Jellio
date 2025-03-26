import { doc, updateDoc } from "firebase/firestore";
import { CardType } from "../../types";
import { db } from "../../firebaseConfig";

export const swapCardsInSameList = async (
    boardId: string,
    listId: string,
    cards: CardType[],
    cardId1: number,
    cardId2: number,
) => {
    try {
        const card1Index = cards.findIndex(card => card.id === cardId1);
        const card2Index = cards.findIndex(card => card.id === cardId2);


        if (card1Index === -1 || card2Index === -1) {
            console.log("Cards not found");
            return;
        }
        const updatedCards = [...cards];

        const tempValue = updatedCards[card1Index];
        updatedCards[card1Index] = updatedCards[card2Index];
        updatedCards[card2Index] = tempValue;

        const listRef = doc(db, "boards", boardId, "lists", listId);
        await updateDoc(listRef, {
            cards: updatedCards,
        })
        console.log("Cards swapped in same list.");
    } catch (error) {
        console.log("error swapping order", error);
    }

}