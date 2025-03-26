import { useEffect, useState } from 'react'
import '../LoginScreen/LoginScreen.css'
import './SignUpScreen.css'
import choosePicture from '../../../src/assets/images/profilePic.png'
import { uploadImageToFirebase } from '../../firebase/uploadImageToFirebase'
import { registerUser } from '../../firebase/registerUser'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header/Header'
const SignUpScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate('/workspaces');
        }
    }, [user, loading, navigate])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);

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
        if (!result) {
            setError("An account with this email already exists");
        } else {
            navigate('/workspaces');
        }

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
        <>
            <Header />
            <div className='signUpScreen' >
                <div className='signUpCardContainer'>
                    <div className='signUpContainer'>
                        <h3>Create account</h3>
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
                            <p style={{ color: selectedImage ? "lime" : "white" }} >{selectedImage ? "Image selected" : "Click to choose an profile picture"}</p>
                        </div>
                        <form className='signUpField'>
                            <p className='helpText'>Username</p>
                            <input
                                className='signInput'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Enter your username'
                                autoComplete='username'
                            />
                        </form>
                        <form className='signUpField'>
                            <p>Email</p>
                            <input
                                className='signInput'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                autoComplete='email'
                            />
                        </form>
                        <form className='signUpField'>
                            <p>Password</p>
                            <input
                                className='signInput'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Write your password'
                                autoComplete='new-password'
                            />
                        </form>
                        <form className='signUpField'>
                            <p>Confirm your password</p>
                            <input
                                className='signInput'
                                type='password'
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                placeholder='Write your password again'
                                autoComplete='new-password'
                            />
                        </form>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button className='loginButton' id='signUpBtn' onClick={handleSignUp}>Create your account</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpScreen