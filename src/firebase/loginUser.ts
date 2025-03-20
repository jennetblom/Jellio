import { auth} from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


export const loginUser = async (email: string, password: string) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.error("Error signing in", error);
        return null;
    }
}