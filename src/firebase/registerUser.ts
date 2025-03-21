import { db, auth } from '../firebaseConfig';
import { setDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import {  createUserWithEmailAndPassword} from "firebase/auth";

export const registerUser = async (username: string, email: string, password: string, profilePic: string) => { 
    try {

        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log("User already exists");
            return false;
        }
      
        const userCrediential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCrediential.user;
        const userRefInFirestore = doc(db, "users", user.uid);

        await setDoc(userRefInFirestore, {
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