import { useEffect, useState } from 'react'
import { signInWithGoogle } from '../../firebase/signInWithGoogle'
import { FcGoogle } from "react-icons/fc";
import JellyIcon from '../../../src/assets/images/jelly96-right.png';
import './LoginScreen.css'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../firebase/loginUser';
import { useAuth } from '../../context/AuthContext';
import { checkUserInDb } from '../../firebase/checkUserInDb';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);
    const { user, loading } = useAuth();

    const signInWithEmail = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        const result = await loginUser(email, password);
        console.log('Login result:', result);
        if (result && "error" in result) {
            setError(result.error);
        } else if (!result) {
            setError("Your account doesn't exist, please create a new account");
        } else {
        
            const userExistsInDb = await checkUserInDb(result.uid);
            if(userExistsInDb) {
                console.log('Login successful, waiting for user state...');
            } else {
                setError("Your account doesn't exist, please create a account");
            }
        }
    }   
    useEffect(()=> {
        if(!loading && user){
            navigate('/workspaces');
        }
    },[user, loading, navigate])

    const handleSignInWithGoogle = async () => {
        setLoadingLogin(true);
        const result = await signInWithGoogle();
        setLoadingLogin(false);
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
                    <form className='loginEmail'>
                        <h3>Login to continue</h3>
                        <input
                            className='loginInput'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                        />
                        <input
                            className='loginInput'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Write your password'
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button className='loginButton' onClick={signInWithEmail}>Sign in</button>
                    </form>
                    <div className='loginGoogle'>
                        <h3>Or continue with</h3>
                        <button onClick={handleSignInWithGoogle} className='loginButton'>
                            <FcGoogle size={30} />
                            <p>{loadingLogin ? "Signing in..." : "Sign in with Google"}</p>
                        </button>
                        <button className='loginButton' id='signUpBtn' onClick={() => navigate('/signup')}>Create an account</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginScreen