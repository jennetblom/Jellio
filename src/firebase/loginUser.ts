import { auth, db} from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const loginUser = async (email: string, password: string, setUser: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if(userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
                ...user,
                userId: user.uid,
                username: user.displayName || "No username",
                email: user.email || "No email",
                profilePic: user.photoURL || "",
                createdAt: new Date(),
            })
        } else {
            setUser(null);
        }

        return user;
    } catch (error) {
        console.error("Error signing in", error);
        return null;
    }
}