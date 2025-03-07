import React, { useEffect, useState } from 'react'
import { signInWithGoogle } from '../../firebase/signInWithGoogle'
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebaseConfig'
import { useAuth } from '../../context/AuthContext'
import { FcGoogle } from "react-icons/fc";
import JellyIcon from '../../../src/assets/images/jellyfish.png';

import './LoginScreen.css'
const LoginScreen = () => {

    const [email, setEmail] = useState("");

    return (
        <div className='loginScreen'>
          {/*   <img src={JellyIcon} style={{width:100, height:100}}></img> */}
            <div className='loginCardContainer'>
                <div className='heading'>
                    <img id='jellyicon' src={JellyIcon} />
                    <h1>Jellio</h1>
                </div>

                <h3>Logga in dig för att fortsätta</h3>
                <button>Logga in</button>
                <input
                id='loginInput'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
                <p>Eller fortsätt med</p>
                <button onClick={signInWithGoogle} className='loginButton'>
                    <FcGoogle size={30} />
                    <p>Google</p>
                </button>
            </div>
        </div>
    )
}

export default LoginScreen