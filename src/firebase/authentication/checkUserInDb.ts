import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const checkUserInDb = async(userId: string) => {
    const userRef= doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    return userSnap.exists();

}