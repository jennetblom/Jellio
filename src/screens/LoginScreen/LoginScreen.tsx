import { useEffect, useState } from 'react'
import { signInWithGoogle } from '../../firebase/authentication/signInWithGoogle'
import { FcGoogle } from "react-icons/fc";
import JellyIcon from '../../../src/assets/images/jelly96-right.png';
import './LoginScreen.css'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../firebase/authentication/loginUser';
import { useAuth } from '../../context/AuthContext';
import { checkUserInDb } from '../../firebase/authentication/checkUserInDb';
import Header from '../../components/Header/Header';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);
    const { user, loading } = useAuth();


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

    const signInWithEmail = async () => {
        try {
            console.log("signInWithEmail");
            if (!email || !password) {
                setError("Please fill in all fields");
                return;
            }
            console.log("signInWithEmail");
            const result = await loginUser(email, password);
            console.log('Login result:', result);

            if (!result) {
                setError("Your account doesn't exist, please create a new account");
                return;
            }
            if ("error" in result) {
                console.log("Login failed with error:", result.error);
                setError(result.error);
                return;
            }


            console.log("Checking user in DB...");
            const userExistsInDb = await checkUserInDb(result.uid);

            if (userExistsInDb) {
                console.log('Login successful, waiting for user state...');
            } else {
                setError("Your account doesn't exist in the database, please create an account");
            }
        } catch (error) {
            console.log("Unexpected error in signInWithEmail:", error);
            setError("Something went wrong. Please try again.");
        }

    }


    const handleSignInWithGoogle = async () => {
        setLoadingLogin(true);
        const result = await signInWithGoogle();
        setLoadingLogin(false);
        if (result) {
            navigate('/workspaces');
        }
    }

    return (
        <>
            <Header />
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
                        <form className='loginEmail' onSubmit={(e) => e.preventDefault()}>
                            <h3>Login to continue</h3>
                            <input
                                className='loginInput'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                autoComplete="email"
                            />
                            <input
                                className='loginInput'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Write your password'
                                autoComplete='current-password'
                            />
                            {error && <p className='errorMessage'>{error}</p>}
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
        </>
    )
}

export default LoginScreen