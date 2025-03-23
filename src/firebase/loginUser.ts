import { auth} from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { User } from "firebase/auth"; 


export const loginUser = async (
    email: string,
     password: string, 
    ) : Promise<User | {error: string} | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return user;
      
       
    } catch (error: any) {
        console.log("Error code:", error.code); 
        if (error.code === "auth/invalid-credential") {
            return { error: "Invalid email or password" };
        }

        return { error: "An error occurred during sign-in" };
    }
}