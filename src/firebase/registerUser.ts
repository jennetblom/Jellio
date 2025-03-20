import { db, auth } from '../firebaseConfig';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export const registerUser = async (username: string, email: string, password: string, profilePic: string) => { 
    try {

        const userRef = doc(db, "users", email);
        const userSnap = await getDoc(userRef);
        
        if(userSnap.exists()) {
            console.log("User already exists");
            return false;
        }

        const userCrediential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCrediential.user;

        await setDoc(userRef, {
            userId: user.uid,
            username: username,
            email: email,
            profilePic: profilePic,
            createdAt: new Date(),
        })

        console.log("Account created successfully");
        return user;
    } catch (error) {
        console.log("Error creating account", error);
        return false;
     }
}