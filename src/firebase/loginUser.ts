import { auth, db} from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth"; 

export const loginUser = async (
    email: string,
     password: string, 
     setUser: React.Dispatch<React.SetStateAction<any>>
    ) : Promise<User | {error: string} | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if(userSnap.exists()) {
            const userData = userSnap.data();
            console.log("User exists", userData);
            setUser({
                ...user,
                userId: user.uid,
                username: userData.username || "No username",
                email: userData.email || "No email",
                profilePic: userData.profilePic || "",
                createdAt: new Date(),
            })
            return user;
        } else {
            console.log("User does not exist");
            await auth.signOut();
            setUser(null);
            return { error: "Your account doesn't exist, please create a new account" };
        }

       
    } catch (error: any) {
        console.log("Error code:", error.code); 
        if (error.code === "auth/invalid-credential") {
            return { error: "Invalid email or password" };
        }

        return { error: "An error occurred during sign-in" };
    }
}