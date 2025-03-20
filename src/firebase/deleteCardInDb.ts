import { CardType, ListType } from '../types';
import { db } from '../firebaseConfig';
import { doc,  updateDoc } from 'firebase/firestore';

export const deleteCardInDb = async (boardId: string, listId: string, lists: ListType[], cardId: number) => {
    try {

        const listToUpdate = lists.find((list => list.id === listId));

        if (!listToUpdate) {
            console.log('List does not exist');
            return false;
        }

        const updatedCards = listToUpdate.cards.filter((card: CardType) => card.id !== cardId);

        const listRef = doc(db, 'boards', boardId, 'lists', listId);

        await updateDoc(listRef, { cards: updatedCards });
        console.log("Card deleted successfully");
        return true;
    } catch (error) {
        console.log('Error deleting card in db', error);
        return false;
    }

}
/* 
export const deleteCardInDb = async (boardId: string, listId: string, cardId: number) => {
    try {
        const listRef = doc(db, 'boards', boardId, 'lists', listId);
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

} */