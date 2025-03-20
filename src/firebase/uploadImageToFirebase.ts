import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const uploadImageToFirebase = async (file: File) => {
    if(!file) return;

    const storageRef = ref(storage, `profilePics/$(file.name)`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    return url;
}