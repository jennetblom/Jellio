import { CardType } from '../types';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const deleteCardInDb = async (boardId: string, listId: string, cardId: number) => {
    try {
        const listRef = doc(db, 'boards', boardId, 'lists', listId.toString());
        const listSnap = await getDoc(listRef);

        if (!listSnap.exists()) {
            console.log('List does not exist');
            return false;
        }

        const listData = listSnap.data();
        const updatedCards = listData.cards.filter((card: CardType) => card.id !== cardId);

        await updateDoc(listRef, { cards: updatedCards});
        return true;
    } catch (error) {
        console.log('Error deleting card in db', error);
        return false;
    }

}