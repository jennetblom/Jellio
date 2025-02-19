
import './HomeScreen.css'
import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    return (
        <div className='homebody'>
            <div className="background-container">
                <div className='wrapper' >
                    <div className='content'>
                        <h1 id='title'>Jellio brings all your tasks, teammates, and tools together</h1>
                        <p id='description'>The best way to organize your workflow in a simple and visual way</p>
                        <Link to="/createboard" >
                        <button className='button'>Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeScreen;