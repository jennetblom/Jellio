import { doc, updateDoc } from "firebase/firestore";
import { CardType } from "../../types";
import { db } from "../../firebaseConfig";


export const swapCardsBetweenLists = async (
    boardId: string,
    listId1: string,
    listId2: string,
    cards1: CardType[],
    cards2: CardType[],
    cardId1: number,
    cardId2: number,
) => {
    try {
        const card1Index = cards1.findIndex(card => card.id === cardId1);
        const card2Index = cards2.findIndex(card => card.id === cardId2);


        if (card1Index === -1 || card2Index === -1) {
            console.log("Cards not found");
            return;
        }
        const updatedCards1 = [...cards1];
        const updatedCards2 = [...cards2];

        const tempCard = updatedCards1[card1Index];
        updatedCards1[card1Index] = updatedCards2[card2Index];
        updatedCards2[card2Index] = tempCard;

        const listRef1 = doc(db, "boards", boardId, "lists", listId1);
        const listRef2 = doc(db, "boards", boardId, "lists", listId2);

        await Promise.all([
            updateDoc(listRef1, { cards: updatedCards1 }),
            updateDoc(listRef2, { cards: updatedCards2 }),
        ]);

        console.log("Cards swapped between lists.");
    } catch (error) {
        console.log("error swapping order", error);
    }

}