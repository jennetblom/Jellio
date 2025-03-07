import { signInWithPopup } from "firebase/auth"
import { auth, provider }  from "../firebaseConfig"

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.log("Google sign in error", error);
    }
}