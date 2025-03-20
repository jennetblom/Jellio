import { useState } from 'react'
import '../LoginScreen/LoginScreen.css'
import './SignUpScreen.css'
import choosePicture from '../../../src/assets/images/profilePic.png'
import { uploadImageToFirebase } from '../../firebase/uploadImageToFirebase'
import { registerUser } from '../../firebase/registerUser'
const SignUpScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleSignUp = async () => {
        if (!email || !password || !passwordConfirm || !username) {
            setError("Please fill in all fields");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Invalid email");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        }
        if (!imageUrl) {
            setError("You need to choose an profile picture");
            return;
        }
        setError("");
        const result = await registerUser(username, email, password, imageUrl);

    }
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);

            const reader = new FileReader();
            reader.onload = async (readerEvent) => {
                const imageUrl = readerEvent.target?.result as string;
                setImagePreview(imageUrl);


                try {
                    const uploadResult = await uploadImageToFirebase(file);
                    if (uploadResult) {
                        console.log("Image uploaded successfully", uploadResult);
                        setImageUrl(uploadResult);
                    }
                } catch (error) {
                    console.log("Error uploading image", error);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='signUpScreen' >
            <div className='signUpCardContainer'>
                <div className='signUpContainer'>
                    <h3>Skapa ditt konto</h3>

                    <div id='headingInSign'>
                        <label htmlFor='file-upload'>
                            <img src={imagePreview || choosePicture} id='profilePic' />
                        </label>
                        <input
                            type='file'
                            id='file-upload'
                            accept='image/*'
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <p>Choose a profile picture</p>
                    </div>
                    <div className='signUpField'>
                        <p>Användarnamn</p>
                        <input
                            id='input'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Ange ditt användarnamn'
                        />
                    </div>
                    <div className='signUpField'>
                        <p>Email</p>
                        <input
                            id='input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Ange din e-postadress'
                        />
                    </div>

                    <div className='signUpField'>
                        <p>Lösenord</p>
                        <input
                            id='input'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Skriv in ditt lösenord'
                        />
                    </div>
                    <div className='signUpField'>
                        <p>Bekräfta ditt lösenord</p>
                        <input
                            id='input'
                            type='password'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder='Skriv in ditt lösenord igen'
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button className='loginButton' id='signUpBtn' onClick={handleSignUp}>Skapa ditt konto</button>
                </div>
            </div>

        </div>
    )
}

export default SignUpScreen