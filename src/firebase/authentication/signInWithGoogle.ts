import { signInWithPopup, } from "firebase/auth"
import { auth, provider, db } from "../../firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";


export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        const currentDate = new Date();
        const timestamp = Timestamp.fromDate(currentDate);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                userId: user.uid,
                username: user.displayName || "No username",
                email: user.email || "No email",
                profilePic: user.photoURL || "",
                createdAt: timestamp,
            })
        }

        return user;
    } catch (error) {
        console.log("Google sign in error", error);
        return null;
    }
}