import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth, provider, db }  from "../firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";


export const signInWithGoogle = async (setUser: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if(!userSnap.exists()) {
            await setDoc(userRef, {
                userId: user.uid,
                username: user.displayName || "No username",
                email: user.email || "No email",
                profilePic: user.photoURL || "",
                createdAt: new Date(),
            })
        }

        setUser({
            ...user,
            userId: user.uid,
            username: user.displayName || "No username",
            email: user.email || "No email",
            profilePic: user.photoURL || "",
            createdAt: new Date(),
        });
    } catch (error) {
        console.log("Google sign in error", error);
    }
}