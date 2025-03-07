import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

export async function addData() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "John Doe",
      email: "john.doe@example.com",
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}