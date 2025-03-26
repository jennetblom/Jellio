import { db } from "../../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ListType } from "../../types";

export const getUserLists = (boardId: string, setLists: React.Dispatch<React.SetStateAction<ListType[]>>) => {

    const listsRef = collection(db, "boards", boardId, "lists");
    const q = query(listsRef, orderBy("index"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const listsData = snapshot.docs.map((doc) => ({
            ...(doc.data() as ListType)
        }));
        setLists(listsData);
    })
    return unsubscribe;
}