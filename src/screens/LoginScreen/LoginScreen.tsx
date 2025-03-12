import React, { useEffect, useState } from 'react'
import { signInWithGoogle } from '../../firebase/signInWithGoogle'
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebaseConfig'
import { useAuth } from '../../context/AuthContext'
import { FcGoogle } from "react-icons/fc";
import JellyIcon from '../../../src/assets/images/jelly96-right.png';

import './LoginScreen.css'
const LoginScreen = () => {

    const [email, setEmail] = useState("");

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
                        <button className='loginButton'>Logga in</button>
                    </div>
                    <div className='loginGoogle'>
                        <h3>Eller fortsätt med</h3>
                        <button onClick={signInWithGoogle} className='loginButton'>
                            <FcGoogle size={30} />
                            <p>Logga in med Google</p>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LoginScreen