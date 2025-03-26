import { db, auth } from '../../firebaseConfig';
import { setDoc, doc,  Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


export const registerUser = async (username: string, email: string, password: string, profilePic: string) => {
    try {


        const userCrediential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCrediential.user;
        const userRefInFirestore = doc(db, "users", user.uid);

        const currentDate = new Date();
        const timestamp = Timestamp.fromDate(currentDate);
        await setDoc(userRefInFirestore, {
            userId: user.uid,
            username: username,
            email: email,
            profilePic: profilePic,
            createdAt: timestamp,
        })

        console.log("Account created successfully");
        return { success: true };
    } catch (error: any) {
        console.log("Error creating account", error);
        if (error.code === "auth/email-already-in-use") {
            return { success: false, error: "This email is already in use" };
        }
        if (error.code === "auth/weak-password") {
            return { success: false, error: "Password is too weak" };
        }
        return { success: false, error: "An unexpected error occurred" };
    }
}