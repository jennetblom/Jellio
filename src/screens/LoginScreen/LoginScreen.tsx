import React, { useEffect, useState } from 'react'
import { signInWithGoogle } from '../../firebase/signInWithGoogle'
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebaseConfig'
import { useAuth } from '../../context/AuthContext'
import { FcGoogle } from "react-icons/fc";
import JellyIcon from '../../../src/assets/images/jelly96-right.png';

import './LoginScreen.css'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../firebase/loginUser';
const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const signIn = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        const result = await loginUser(email, password);
        if (!result) {
            setError("Invalid email or password");
        }
        else {
            navigate('/workspaces');
        }
    }
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
                        <h3>Logga in för att fortsätta</h3>
                        <input
                            id='loginInput'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Ange din e-postadress'
                        />
                           <input
                            id='loginInput'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Skriv in ditt lösenord'
                        />
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        <button className='loginButton' onClick={signIn}>Logga in</button>
                    </div>
                    <div className='loginGoogle'>
                        <h3>Eller fortsätt med</h3>
                        <button onClick={signInWithGoogle} className='loginButton'>
                            <FcGoogle size={30} />
                            <p>Logga in med Google</p>
                        </button>
                        <button className='loginButton' id='signUpBtn' onClick={() => navigate('/signup')}>Skapa konto</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginScreen