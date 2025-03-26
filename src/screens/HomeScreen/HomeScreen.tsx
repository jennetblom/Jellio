

import Header from '../../components/Header/Header';
import './HomeScreen.css'
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <>
            <Header />
            <div className='homebody'>
                <div className="background-container">
                    <div className='wrapper'>
                        <div className='content'>
                            <h1 className='title'>Jellio brings all your tasks, teammates, and tools together</h1>
                            <p id='description'>The best way to organize your workflow in a simple and visual way</p>
                            <Link to="/login">
                                <button className='getStartedButton'>Get Started</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default HomeScreen;