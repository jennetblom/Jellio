import React, { useEffect, useState } from 'react'
import { signInWithGoogle } from '../../firebase/signInWithGoogle'
import { useAuth } from '../../context/AuthContext'
import { FcGoogle } from "react-icons/fc";
import JellyIcon from '../../../src/assets/images/jelly96-right.png';
import './LoginScreen.css'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../firebase/loginUser';

const LoginScreen = () => {
    const { setUser, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const signInWithEmail = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        const result = await loginUser(email, password, setUser);

        if (result && "error" in result) {
            setError(result.error);
        } else if (!result) {
            setError("Your account doesn't exist, please create a new account");
        } else {
            navigate('/workspaces');
        }
    }

    const handleSignInWithGoogle = async () => {
        setLoading(true);
        const result = await signInWithGoogle(setUser);
        setLoading(false);
        if (result) {
            navigate('/workspaces');
        }
    }
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className='loginScreen'>
            <div className='loginCardContainer'>
                <div className='heading'>
                    <h1>Jellio</h1>
                    <div>
                        <img id='jellyicon' src={JellyIcon} />
                        <img id='jellyiconMiddle' src={JellyIcon} />
                        <img id='jellyicon' src={JellyIcon} />
                    </div>
                </div>
                <div className='cardSection'>
                    <div className='loginEmail'>
                        <h3>Login to continue</h3>
                        <input
                            id='loginInput'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                        />
                        <input
                            id='loginInput'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Write your password'
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button className='loginButton' onClick={signInWithEmail}>Sign in</button>
                    </div>
                    <div className='loginGoogle'>
                        <h3>Or continue with</h3>
                        <button onClick={handleSignInWithGoogle} className='loginButton'>
                            <FcGoogle size={30} />
                            <p>{loading ? "Signing in..." : "Sign in with Google"}</p>
                        </button>
                        <button className='loginButton' id='signUpBtn' onClick={() => navigate('/signup')}>Create an account</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginScreen