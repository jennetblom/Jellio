import { CardType } from '../types';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const updateCardInDb = async (boardId: string, listId: string, updatedCard: CardType) => {
    try {
        const listRef = doc(db, 'boards', boardId, 'lists', listId.toString());
        const listSnap = await getDoc(listRef);

        if (!listSnap.exists()) {
            console.log('List does not exist');
            return false;
        }

        const listData = listSnap.data();
        const updatedCards = listData.cards.map((card: CardType) =>
            card.id === updatedCard.id ? { ...card, ...updatedCard } : card

        );

        await updateDoc(listRef, { cards: updatedCards });
        console.log("Card updated successfully");
        return true;


    } catch (error) {
        console.log('Error updating card in db', error);
        return false;
    }
}