
import { db } from '../../firebaseConfig'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { BoardType } from '../../types';


export const listenToBoards = (userId: string, setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>) => {

    if (!userId) {return () => {}}

    const boardsQuery = query(
        collection(db, 'boards'),
        where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(boardsQuery, (snapshot) => {
        const userBoards: BoardType[] = snapshot.docs.map(doc => ({
            ...doc.data() as BoardType,
        }));
        setBoards(userBoards);
    }, (error) => {
        console.error("Error fetching boards:", error);
    });


    return unsubscribe;
}